import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The first name of the user.' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user.' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'The email address of the user.' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "The user's password." })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
