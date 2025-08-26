import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePhoneDto {
  @IsString()
  label: string;

  @IsString()
  countryCode: string;

  @IsNumberString()
  number: string;

  @IsOptional()
  @IsBoolean()
  isPrimary: boolean = false;
}
