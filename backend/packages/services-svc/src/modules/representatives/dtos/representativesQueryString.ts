import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

export class RepresentativeQueryStringDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  page: number

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  pageSize: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string
}
