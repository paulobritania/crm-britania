import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsBoolean } from 'class-validator'

export class CreateBuyerAddressDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  idBuyers: number

  @IsOptional()
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
