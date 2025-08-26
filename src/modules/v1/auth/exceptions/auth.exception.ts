import { BadRequestException } from '@nestjs/common';

export class AuthenticationException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidCredentials extends AuthenticationException {
  constructor(message: string = 'Invalid credentials!') {
    super(message);
  }
}
