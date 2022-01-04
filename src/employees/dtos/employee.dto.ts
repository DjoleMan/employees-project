import { HomeAddressDto } from './homeAddress.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  Length,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class EmployeeDto {
  @ApiProperty({
    type: String,
    description: 'Name of the employee.',
    example: 'Marko',
  })
  @IsDefined({ message: 'name field is required' })
  @Length(2, 50)
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Email address of the employee.',
    example: 'marko@gmail.com',
  })
  @IsDefined({ message: 'email_address field is required' })
  @IsEmail()
  readonly email_address: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of the employee.',
    example: '+38165555333',
  })
  @IsDefined({ message: 'phone_number field is required' })
  @IsPhoneNumber()
  readonly phone_number: string;

  @ApiProperty({
    type: HomeAddressDto,
    description: 'Home address informations.',
  })
  @IsDefined({ message: 'home_address field is required' })
  @ValidateNested()
  @Type(() => HomeAddressDto)
  readonly home_address: HomeAddressDto;

  @ApiProperty({
    type: String,
    description: `Employee's birthday`,
    example: '1991-09-25',
  })
  @IsDefined({ message: 'date_of_birth field is required' })
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
}
