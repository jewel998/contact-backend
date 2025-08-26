import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const Headers = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    return data ? request.headers?.[data] : request.headers;
  },
);
