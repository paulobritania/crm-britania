import { ApiProperty } from '@nestjs/swagger'

export class WorkflowNdDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  issuerCompanyCode: number

  @ApiProperty()
  issuerCompanyName: string

  @ApiProperty()
  number: string

  @ApiProperty()
  issueDate: Date

  @ApiProperty()
  dueDate: Date

  @ApiProperty()
  value: number

  @ApiProperty()
  company: string

  @ApiProperty()
  observation: string

  @ApiProperty()
  active: boolean

  @ApiProperty()
  reasonDeactivation: string

  @ApiProperty()
  workflowVpcId: number
}
