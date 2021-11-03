import { ApiProperty } from '@nestjs/swagger'

export class CompaniesBankAccountDto {
  @ApiProperty()
  id

  @ApiProperty()
  companyCode

  @ApiProperty()
  bankCode

  @ApiProperty()
  agency

  @ApiProperty()
  account

  @ApiProperty()
  note
}
