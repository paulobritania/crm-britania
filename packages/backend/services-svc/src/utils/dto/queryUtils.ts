import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, Max } from 'class-validator'

export class QueryUtilsDto {
  @IsNumber()
  @IsOptional()
  @Max(999)
  @ApiProperty({ required: false })
  limit: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  offset: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  startDate: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  endDate: string;
}
