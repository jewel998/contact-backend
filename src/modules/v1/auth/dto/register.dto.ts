import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterAccountDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
