import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsNumber, IsOptional, IsBoolean } from 'class-validator'

export class CreateBuyerAddressDto {
  @IsNumber()
  @ApiProperty()
  idBuyers: number

  @IsNumber()
  @ApiProperty()
  idAddress: number

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  addressType: number

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  deliveryAddress: boolean

}
