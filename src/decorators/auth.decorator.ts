import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export interface RequestAuth {
  uid: string;
  sid: string;
  scopes: string[];
}

export const Auth = createParamDecorator(
  (data: keyof RequestAuth, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    return data ? request.auth?.[data] : request.auth;
  },
);
