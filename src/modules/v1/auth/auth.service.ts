import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@/modules/v1/user/user.service';
import { TokenService } from './token.service';
import { RegisterAccountDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import { LoginDto } from './dto/login.dto';
import { AccountService } from '@/modules/v1/account/account.service';
import { InvalidCredentials } from './exceptions/auth.exception';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  getBearerToken(authorization?: string) {
    if (authorization) {
      const token = authorization.split(' ')[1];

      return token;
    }

    throw new UnauthorizedException();
  }

  validate(token: string) {
    return this.tokenService.verifyAccessToken(token);
  }

  refresh(refreshToken?: string) {
    if (refreshToken) {
      const decoded = this.tokenService.verifyRefreshToken(refreshToken);
      const token = this.tokenService.genAccessToken(
        decoded.uid,
        decoded.sid,
        [],
      );
      return { token };
    }

    throw new UnauthorizedException();
  }

  getAuthUser(id: string) {
    return this.userService.getById(id);
  }

  auth(res: FastifyReply, userId: string, sessionId: string) {
    const [refreshToken, token] = this.tokenService.getTokens(
      userId,
      sessionId,
      [],
    );
    res.setCookie('user', refreshToken, {
      path: '/api/v1/auth',
      maxAge: 10 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return { token };
  }

  async register(body: RegisterAccountDto, res: FastifyReply) {
    const user = await this.userService.create(body);
    const sessionId = '123';
    return this.auth(res, user.id, sessionId);
  }

  async login(body: LoginDto, res: FastifyReply) {
    const userId = await this.accountService.verify(body.email, body.password);
    if (!userId) throw new InvalidCredentials();
    const sessionId = '123';
    return this.auth(res, userId, sessionId);
  }
}
