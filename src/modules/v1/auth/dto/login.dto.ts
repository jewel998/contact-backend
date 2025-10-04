import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'The email address for login.' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password for login.' })
  @IsString()
  password: string;
}
