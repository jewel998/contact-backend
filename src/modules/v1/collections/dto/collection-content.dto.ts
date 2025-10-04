import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CollectionContentDto {
  @ApiProperty({
    example: 'A collection of the best summer destinations.',
    description: 'A brief description of the collection\'s content.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: ['Beach Holidays', 'Mountain Escapes'],
    description: 'A list of featured items in the collection.',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  featuredItems?: string[];
}