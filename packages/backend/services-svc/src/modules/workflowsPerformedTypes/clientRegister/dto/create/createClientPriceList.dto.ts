import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class CreateClientPriceListDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  establishment128CdEsCode: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  establishment22Code: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  establishment15Code: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  establishment31ManausCode: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  establishment31AgScCode: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  establishment31AgSpCode: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  establishment305CdPe: string
}
