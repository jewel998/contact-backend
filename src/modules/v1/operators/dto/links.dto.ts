import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsOptional } from 'class-validator';

export class LinksDto {
  @ApiProperty({
    description: 'The operator\'s official website.',
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: 'The operator\'s Facebook page.',
  })
  @IsOptional()
  @IsUrl()
  facebook?: string;

  @ApiProperty({
    description: 'The operator\'s Instagram page.',
  })
  @IsOptional()
  @IsUrl()
  instagram?: string;
}