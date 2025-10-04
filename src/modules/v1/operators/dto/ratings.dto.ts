import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, Min, Max } from 'class-validator';

export class RatingsDto {
  @ApiProperty({
    example: 4.5,
    description: 'The average rating of the operator.',
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  average: number;

  @ApiProperty({
    example: 100,
    description: 'The total number of ratings.',
  })
  @IsInt()
  @Min(0)
  count: number;
}