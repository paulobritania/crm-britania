import { ApiProperty } from '@nestjs/swagger'

export class SyntheticReportDto {
  @ApiProperty()
  representative: string

  @ApiProperty()
  customerCode: string

  @ApiProperty()
  customerName: string

  @ApiProperty()
  socialReason: string

  @ApiProperty()
  establishment: string

  @ApiProperty()
  nfTitle: string

  @ApiProperty()
  nfValue: string

  @ApiProperty()
  dueDate: string

  @ApiProperty()
  deliveryDate: string

  @ApiProperty()
  deadline: number

  @ApiProperty()
  duplicateExpiration: string

  @ApiProperty()
  paymentStatus: string

  @ApiProperty()
  financialObservation: string
}
