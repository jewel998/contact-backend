import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { FastifyRequest as Request } from 'fastify';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId || typeof tenantId !== 'string' || tenantId.trim() === '') {
      throw new BadRequestException('x-tenant-id header is required');
    }

    return true;
  }
}
