import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class CreateClientAdditionalInformationRevenueDto {
  id: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  month: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  year: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  value: number
}
