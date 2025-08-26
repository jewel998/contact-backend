import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest as Request } from 'fastify';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/v1/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService)) private readonly auth: AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.auth.getBearerToken(request.headers.authorization);

    if (token) {
      try {
        const decoded = this.auth.validate(token);
        request.auth = decoded;
        return true;
      } catch {
        // throw same error
      }
    }

    throw new UnauthorizedException();
  }
}
