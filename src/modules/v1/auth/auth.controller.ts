import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookies } from 'src/decorators/cookie.decorator';
import { RegisterAccountDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import { LoginDto } from './dto/login.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  auth(@Cookies('user') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('/register')
  register(
    @Body() body: RegisterAccountDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.authService.register(body, res);
  }

  @Post('/login')
  login(@Body() body: LoginDto, @Res({ passthrough: true }) res: FastifyReply) {
    return this.authService.login(body, res);
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  user(@Auth('uid') uid: string) {
    return this.authService.getAuthUser(uid);
  }

  @Get('/logout')
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
