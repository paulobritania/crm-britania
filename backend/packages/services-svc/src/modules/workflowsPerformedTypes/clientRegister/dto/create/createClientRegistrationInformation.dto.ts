import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber } from 'class-validator'

export class CreateClientRegistrationInformationDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  representativeCode: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  representativeName: string
}
