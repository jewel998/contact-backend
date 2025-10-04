import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HealthDto {
  @ApiProperty({ description: 'Indicates the health status of the application.' })
  @IsString()
  status: string;
}