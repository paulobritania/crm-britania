import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber, MaxLength } from 'class-validator'

export class CreateClientAdditionalInformationParticipationCompanyDto {
  id: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string

  @MaxLength(2)
  @IsString()
  @IsOptional()
  @ApiProperty()
  state: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  branch: string

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  participationPercent: number
}
