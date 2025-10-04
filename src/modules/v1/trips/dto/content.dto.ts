import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ContentDto {
  @ApiProperty({
    description: 'Detailed information about the trip content.',
  })
  @IsString()
  @IsNotEmpty()
  details: string;
}