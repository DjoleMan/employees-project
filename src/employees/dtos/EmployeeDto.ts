import { IsPostalCodeCustom } from '../helpers/validatePostalCode';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  Length,
  IsOptional,
  ValidateNested,
} from 'class-validator';

class HomeAddress {
  @IsDefined({ message: 'city field is required' })
  @Length(2, 85)
  city: string;

  @IsPostalCodeCustom('zip_code', { message: 'zip_code is not valid' })
  @IsDefined({ message: 'zip_code field is required' })
  zip_code: string;

  @IsDefined({ message: 'address_1 field is required' })
  @Length(4, 50)
  address_1: string;

  @IsOptional()
  @Length(4, 50)
  address_2: string;
}

export class EmployeeDto {
  @IsDefined({ message: 'name field is required' })
  @Length(2, 50)
  readonly name: string;

  @IsDefined({ message: 'email_address field is required' })
  @IsEmail()
  readonly email_address: string;

  @IsDefined({ message: 'phone_number field is required' })
  @IsPhoneNumber()
  readonly phone_number: string;

  @IsDefined({ message: 'home_address field is required' })
  @ValidateNested()
  @Type(() => HomeAddress)
  readonly home_address: HomeAddress;

  @IsOptional()
  @IsDateString()
  date_of_employment: string;

  @IsDefined({ message: 'date_of_birth field is required' })
  @IsDateString()
  date_of_birth: string;
}
