import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class LineQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  clientTotvsCode: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string
}
