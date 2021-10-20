import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsBoolean } from 'class-validator'

import { RiskClassEnum } from '../../enum/RiskClass.enum'

export class CreateClientCadastralCheck {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  cadastralCheck: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  newClient: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: RiskClassEnum })
  riskClass: string
}
