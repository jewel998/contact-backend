import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Cookies } from 'src/decorators/cookie.decorator';
import { RegisterAccountDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import { LoginDto } from './dto/login.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  @ApiOperation({ summary: 'Refresh authentication token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  auth(@Cookies('user') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiResponse({ status: 201, description: 'Account created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  register(
    @Body() body: RegisterAccountDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.authService.register(body, res);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Log in to an account' })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  login(@Body() body: LoginDto, @Res({ passthrough: true }) res: FastifyReply) {
    return this.authService.login(body, res);
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  @ApiOperation({ summary: 'Get authenticated user' })
  @ApiResponse({ status: 200, description: 'User data retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  user(@Auth('uid') uid: string) {
    return this.authService.getAuthUser(uid);
  }

  @Get('/logout')
  @ApiOperation({ summary: 'Log out' })
  @ApiResponse({ status: 200, description: 'Logged out successfully.' })
  logout(@Res({ passthrough: true }) res: FastifyReply) {
    res.clearCookie('user', {
      path: '/api/v1/auth',
      maxAge: 10 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return true;
  }
}
