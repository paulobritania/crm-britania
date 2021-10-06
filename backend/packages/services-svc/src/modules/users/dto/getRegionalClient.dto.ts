import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsString, IsNotEmpty } from 'class-validator'

const required = { required: true }
export class GetRegionalClientDto {
  @IsString()
  @ApiProperty(required)
  lineCodes: string

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty(required)
  clientCode: number
}
