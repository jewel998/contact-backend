import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AncestorDto {
  @ApiProperty({
    example: 'Africa',
    description: 'The name of the ancestor destination.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'africa',
    description: 'The slug of the ancestor destination.',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;
}