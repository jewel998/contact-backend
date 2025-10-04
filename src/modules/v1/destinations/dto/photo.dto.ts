import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class PhotoDto {
  @ApiProperty({
    description: 'The URL of the photo.',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'A caption for the photo.',
  })
  @IsOptional()
  @IsString()
  caption?: string;
}