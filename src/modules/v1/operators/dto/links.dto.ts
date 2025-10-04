import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsOptional } from 'class-validator';

export class LinksDto {
  @ApiProperty({
    example: 'https://www.awesome-adventures.com',
    description: 'The operator\'s official website.',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    example: 'https://www.facebook.com/awesomeadventures',
    description: 'The operator\'s Facebook page.',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  facebook?: string;

  @ApiProperty({
    example: 'https://www.instagram.com/awesomeadventures',
    description: 'The operator\'s Instagram page.',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  instagram?: string;
}