import { ApiProperty } from '@nestjs/swagger'

export class WorkflowProductDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  number: number

  @ApiProperty()
  quantity: number

  @ApiProperty()
  name: string

  @ApiProperty()
  workflowVpcId: number
}
