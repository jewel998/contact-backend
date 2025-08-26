import 'fastify';
import { RequestAuth } from 'src/decorators/auth.decorator';

declare module 'fastify' {
  interface FastifyInstance {
    getDefaultRoute?: () => string; // if applicable
    setDefaultRoute?: (route: string) => void; // if applicable
    serializeCookie: typeof import('@fastify/cookie').serializeCookie;
    parseCookie: typeof import('@fastify/cookie').parseCookie;
    csrfProtection: typeof import('@fastify/csrf-protection').csrfProtection;
    signCookie: typeof import('@fastify/cookie').sign;
    unsignCookie: typeof import('@fastify/cookie').unsign;
  }
  interface FastifyRequest {
    auth?: RequestAuth;
    cookies: {
      [cookieName: string]: string;
    };
  }
}
