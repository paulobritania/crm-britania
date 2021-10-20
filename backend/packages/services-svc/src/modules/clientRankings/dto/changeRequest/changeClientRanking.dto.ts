import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'

const fieldIsRequired = { required: true }

export class ChangeClientRankingDto {
  @ApiProperty(fieldIsRequired)
  @IsNumber()
  @IsNotEmpty()
  rankingId: number

  @ApiProperty(fieldIsRequired)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  justification: string
}
