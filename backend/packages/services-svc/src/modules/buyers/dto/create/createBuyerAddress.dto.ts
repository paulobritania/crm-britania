import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsNumber, IsOptional, IsBoolean } from 'class-validator'

export class CreateBuyerAddressDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  street: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  complement: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  number: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  district: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  city: string

  @IsOptional()
  @IsString()
  @Length(2, 2)
  @ApiProperty()
  uf: string

  @IsOptional()
  @IsString()
  @Length(8)
  @ApiProperty()
  cep: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  delivery_address: boolean
}
