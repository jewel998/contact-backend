import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString, Min, IsOptional } from 'class-validator';

export class ListUserDto {
  @ApiProperty({
    description: 'Page number for pagination.',
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: 'Number of items per page.',
    default: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 10;

  @ApiProperty({
    description: 'Sort order.',
    enum: ['asc', 'desc'],
    default: 'desc',
    required: false,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';

  @ApiProperty({
    description: 'Field to sort by.',
    default: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  sort: string = 'createdAt';
}
