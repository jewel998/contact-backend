import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CollectionContentDto {
  @ApiProperty({
    description: 'A brief description of the collection\'s content.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'A list of featured items in the collection.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  featuredItems?: string[];
}