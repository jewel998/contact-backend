import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    description: 'A brief description of the operator.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'A list of awards or recognitions.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  awards?: string[];
}