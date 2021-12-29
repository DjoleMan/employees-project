import { IsPostalCodeCustom } from '../helpers/validatePostalCode';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: String,
    description: 'Name of the home city.',
    default: '',
  })
  @IsDefined({ message: 'city field is required' })
  @Length(2, 85)
  city: string;

  @ApiProperty({
    type: String,
    description: 'Zip code of the home city.',
    default: '',
  })
  @IsPostalCodeCustom('zip_code', { message: 'zip_code is not valid' })
  @IsDefined({ message: 'zip_code field is required' })
  zip_code: string;

  @ApiProperty({ type: String, description: 'Address 1.', default: '' })
  @IsDefined({ message: 'address_1 field is required' })
  @Length(4, 50)
  address_1: string;

  @ApiProperty({ type: String, description: 'Address 2.', default: '' })
  @IsOptional()
  @Length(4, 50)
  address_2: string;
}

export class EmployeeDto {
  @ApiProperty({
    type: String,
    description: 'Name of the employee.',
    default: '',
  })
  @IsDefined({ message: 'name field is required' })
  @Length(2, 50)
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Email address of the employee.',
    default: '',
  })
  @IsDefined({ message: 'email_address field is required' })
  @IsEmail()
  readonly email_address: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of the employee.',
    default: '',
  })
  @IsDefined({ message: 'phone_number field is required' })
  @IsPhoneNumber()
  readonly phone_number: string;

  @ApiProperty({
    type: HomeAddress,
    description: 'Home address of the employee.',
    default: '',
  })
  @IsDefined({ message: 'home_address field is required' })
  @ValidateNested()
  @Type(() => HomeAddress)
  readonly home_address: HomeAddress;

  @ApiProperty({
    type: String,
    description: 'Date of employment.',
    default: Date.now,
  })
  @IsOptional()
  @IsDateString()
  date_of_employment: string;

  @ApiProperty({
    type: String,
    description: 'Birthday of the employee.',
    default: '',
  })
  @IsDefined({ message: 'date_of_birth field is required' })
  @IsDateString()
  date_of_birth: string;
}
