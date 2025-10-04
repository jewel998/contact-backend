import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class AttributionDto {
  @ApiProperty({
    example: 'TripAdvisor',
    description: 'The name of the attribution source.',
  })
  @IsString()
  @IsNotEmpty()
  sourceName: string;

  @ApiProperty({
    example: 'https://www.tripadvisor.com',
    description: 'The URL of the attribution source.',
  })
  @IsUrl()
  @IsNotEmpty()
  sourceUrl: string;
}