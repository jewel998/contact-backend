import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class ProfileDto {
  @ApiProperty({
    example: 'A leading provider of adventure travel experiences.',
    description: 'A brief description of the operator.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: ['Best Adventure Tour Operator 2023'],
    description: 'A list of awards or recognitions.',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  awards?: string[];
}