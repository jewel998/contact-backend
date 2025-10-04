import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterAccountDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user.' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user.' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address for registration.' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd123!', description: 'The password for the new account.' })
  @IsStrongPassword()
  password: string;
}
