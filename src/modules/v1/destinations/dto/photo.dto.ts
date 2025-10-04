import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class PhotoDto {
  @ApiProperty({
    example: 'https://cdn.example.com/photo.jpg',
    description: 'The URL of the photo.',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    example: 'A beautiful sunset over the savanna.',
    description: 'A caption for the photo.',
    required: false,
  })
  @IsOptional()
  @IsString()
  caption?: string;
}