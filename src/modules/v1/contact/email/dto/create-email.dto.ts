import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  label: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isPrimary: boolean = false;
}
