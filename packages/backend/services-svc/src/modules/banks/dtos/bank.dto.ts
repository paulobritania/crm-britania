import { ApiProperty } from '@nestjs/swagger'

export class BankDto {
  @ApiProperty()
  code: string

  @ApiProperty()
  description: string
}
