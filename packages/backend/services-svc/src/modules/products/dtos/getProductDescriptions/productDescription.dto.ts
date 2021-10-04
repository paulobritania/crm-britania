import { ApiProperty } from '@nestjs/swagger'

export class ProductDescriptionDto {
  @ApiProperty()
  productCode: string

  @ApiProperty()
  productDescription: string
}
