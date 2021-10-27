import { ApiProperty } from '@nestjs/swagger'

export class FindDetailsAddressDto {
  @ApiProperty()
  zipCode: string

  @ApiProperty()
  publicPlace: string

  @ApiProperty()
  number: number

  @ApiProperty()
  district: string

  @ApiProperty()
  complement: string

  @ApiProperty()
  city: string

  @ApiProperty()
  state: string

  @ApiProperty()
  country: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  email: string
}
