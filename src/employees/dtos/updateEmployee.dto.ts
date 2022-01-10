import {
  IsOptional,
  IsDateString,
  Length,
  IsEmail,
  IsPhoneNumber,
  ValidateNested,
  IsString,
  IsEmpty,
} from 'class-validator';
import { IsPostalCodeCustom } from '../helpers/validatePostalCode';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class HomeAddress {
  @ApiPropertyOptional({
    type: String,
    description: `Name of the employee's home city.`,
    example: 'Beograd',
  })
  @IsOptional()
  @IsString()
  @Length(2, 85)
  city: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Zip Code of the city',
    example: '11000',
  })
  @IsOptional()
  @IsPostalCodeCustom('zip_code', { message: 'zip_code is not valid' })
  zip_code: string;

  @ApiPropertyOptional({
    type: String,
    description: `Address_1 of employee.`,
    example: 'Balkanska 8',
  })
  @IsOptional()
  @Length(4, 50)
  address_1: string;

  @ApiPropertyOptional({
    type: String,
    description: `Address_2 of employee.`,
    example: 'Topolska 18',
  })
  @IsOptional()
  @Length(4, 50)
  address_2: string;
}

export class UpdateEmployeeDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Name of the employee.',
    example: 'Marko',
  })
  @IsOptional()
  @Length(2, 50)
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Email address of the employee.',
    example: 'marko@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email_address: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Phone number of the employee.',
    example: '+38165555333',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone_number: string;

  @ApiPropertyOptional({
    type: HomeAddress,
    description: 'Home address informations.',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => HomeAddress)
  home_address: HomeAddress;

  @ApiPropertyOptional({
    type: String,
    description: `Employee's birthday`,
    example: '1991-09-25',
  })
  @IsOptional()
  @IsDateString()
  date_of_birth: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Date of employment.',
    example: '2021-06-28',
  })
  @IsOptional()
  @IsDateString()
  date_of_employment: string;

  @IsEmpty()
  softDeleted: boolean;
}
