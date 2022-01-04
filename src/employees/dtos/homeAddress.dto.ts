import { IsPostalCodeCustom } from '../helpers/validatePostalCode';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, Length, IsOptional } from 'class-validator';

export class HomeAddressDto {
  @ApiProperty({
    type: String,
    description: `Name of the employee's home city.`,
    example: 'Beograd',
  })
  @IsDefined({ message: 'city field is required' })
  @Length(2, 85)
  city: string;

  @ApiProperty({
    type: String,
    description: `Zip Code of the city.`,
    example: '11000',
  })
  @IsDefined({ message: 'zip_code field is required' })
  @IsPostalCodeCustom('zip_code', { message: 'zip_code is not valid' })
  zip_code: string;

  @ApiProperty({
    type: String,
    description: `Address_1 of employee.`,
    example: 'Balkanska 8',
  })
  @IsDefined({ message: 'address_1 field is required' })
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
