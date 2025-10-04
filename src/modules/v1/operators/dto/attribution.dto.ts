import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class AttributionDto {
  @ApiProperty({
    description: 'The name of the attribution source.',
  })
  @IsString()
  @IsNotEmpty()
  sourceName: string;

  @ApiProperty({
    description: 'The URL of the attribution source.',
  })
  @IsUrl()
  @IsNotEmpty()
  sourceUrl: string;
}