import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class FindAllFanNumbersQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  number: string
}