import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class BrandDto {
  @ApiProperty({
    description: 'The brand name of the operator.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The URL of the brand logo.',
  })
  @IsUrl()
  @IsNotEmpty()
  logoUrl: string;
}
