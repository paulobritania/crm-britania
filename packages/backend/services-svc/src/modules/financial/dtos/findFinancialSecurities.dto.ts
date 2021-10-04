import { ApiProperty } from '@nestjs/swagger'

export class FindFinancialSecuritiesDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  establishment: string

  @ApiProperty()
  customerCode: string

  @ApiProperty()
  customerName: string

  @ApiProperty()
  nfTitle: string

  @ApiProperty()
  nfValue: string

  @ApiProperty()
  dueDate?: string

  @ApiProperty()
  installment?: number

  @ApiProperty()
  totalAmountBankSlip?: string

  @ApiProperty()
  totalAmountInstallment?: string

  @ApiProperty()
  balance?: string

}
