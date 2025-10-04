import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyCookie from '@fastify/cookie';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Backend Service')
    .setDescription('Maintaining API Documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);
  await app.register(helmet);
  const allowedOrigins = [/localhost/, /0.0.0.0/];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.register(fastifyCookie, {
    secret: configService.get<string>('COOKIE_SECRET') ?? 'BqKWEbVRkY',
  });

  await app.register(fastifyCsrf);
  await app.listen(configService.get<string>('PORT') ?? 3000, '0.0.0.0');
}
void bootstrap();
