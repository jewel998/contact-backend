import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class SourceDto {
  @ApiProperty({
    example: 'Official Tourism Board',
    description: 'The name of the source of information.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'https://www.tourism.gov',
    description: 'The URL of the source.',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
