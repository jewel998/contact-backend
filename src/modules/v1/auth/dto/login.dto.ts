import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address for login.' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd123!', description: 'The password for login.' })
  @IsString()
  password: string;
}
