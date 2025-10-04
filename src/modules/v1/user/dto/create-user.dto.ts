import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user.' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user.' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email address of the user.' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd123!', description: 'The user\'s password.', required: false })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
