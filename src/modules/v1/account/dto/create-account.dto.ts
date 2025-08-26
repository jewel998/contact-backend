import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsEmail()
  email: string;
}
