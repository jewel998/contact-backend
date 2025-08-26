import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsUrl({ protocols: ['https'] })
  icon?: string;
}
