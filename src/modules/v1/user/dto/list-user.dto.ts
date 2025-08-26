import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsString, Min } from 'class-validator';

export class ListUserDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 10;

  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc';

  @IsString()
  sort: string = 'createdAt';
}
