import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Page number',
  })
  @IsOptional()
  @IsString()
  pageNumber: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Page limit',
  })
  @IsOptional()
  @IsString()
  pageLimit: string;
}
