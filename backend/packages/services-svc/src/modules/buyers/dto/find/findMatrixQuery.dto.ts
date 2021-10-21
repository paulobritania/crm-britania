import { ApiProperty } from '@nestjs/swagger'

export class FindMatrixDto {
  @ApiProperty({ required: false })
  clientTotvsCode: number

  @ApiProperty({ required: false })
  name: string

  @ApiProperty({ required: false })
  cnpj: string
}
