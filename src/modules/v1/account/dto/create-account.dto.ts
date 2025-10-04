import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    description: 'The ID of the user associated with this account.',
  })
  @IsMongoId()
  userId: string;

  @ApiProperty({ description: 'The password for the account.' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'The primary email for the account.' })
  @IsEmail()
  email: string;
}
