import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'John', description: 'The first name of the contact.' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the contact.' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
