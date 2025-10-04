import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class BrandDto {
  @ApiProperty({
    example: 'Awesome Adventures',
    description: 'The brand name of the operator.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://cdn.awesome-adventures.com/logo.png',
    description: 'The URL of the brand logo.',
  })
  @IsUrl()
  @IsNotEmpty()
  logoUrl: string;
}