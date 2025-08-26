import { BadRequestException } from '@nestjs/common';

export class AccountException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

export class AccountAlreadyExists extends AccountException {
  constructor(message: string = 'Account already exists!') {
    super(message);
  }
}
