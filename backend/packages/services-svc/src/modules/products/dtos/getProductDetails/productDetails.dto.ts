import { ApiProperty } from '@nestjs/swagger'

export class ProductDetailsDto {
  @ApiProperty()
  description: string

  @ApiProperty()
  code: number
}
