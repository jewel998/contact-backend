import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterAccountDto {
  @ApiProperty({ description: 'The first name of the user.' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user.' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The email address for registration.' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password for the new account.' })
  @IsStrongPassword()
  password: string;
}
