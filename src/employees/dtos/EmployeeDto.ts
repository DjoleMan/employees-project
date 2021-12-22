import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsPostalCode,
  IsEmail,
  IsPhoneNumber,
  Length,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class HomeAddress {
  @Length(2, 85)
  city: string;
  @IsPostalCode()
  zip_code: string;
  @Length(4, 50)
  address_1: string;
  @Optional()
  @Length(4, 50)
  address_2: string;
}

export class EmployeeDto {
  @Length(2, 50)
  readonly name: string;

  @IsEmail()
  readonly email_address: string;

  @IsPhoneNumber()
  readonly phone_number: string;

  @ValidateNested()
  readonly home_address: HomeAddress;

  @IsOptional()
  @IsDateString()
  date_of_employment: string;

  @IsDateString()
  date_of_birth: string;
}
