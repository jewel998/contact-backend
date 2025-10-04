import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ContentDto {
  @ApiProperty({
    example: 'Discover the rich history and vibrant culture of this amazing destination.',
    description: 'Detailed information about the trip content.',
  })
  @IsString()
  @IsNotEmpty()
  details: string;
}