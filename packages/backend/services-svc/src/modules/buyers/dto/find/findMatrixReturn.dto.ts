import { ApiProperty } from '@nestjs/swagger'

export class FindMatrixReturnDto {
  @ApiProperty()
  code: number

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  name: string

  @ApiProperty()
  socialReason: string
}
