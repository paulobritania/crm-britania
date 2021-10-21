import { ApiProperty } from '@nestjs/swagger'

export class WorkflowVpcLineFamilyDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  lineCode: number

  @ApiProperty()
  lineDescription: string

  @ApiProperty()
  familyCode: number

  @ApiProperty()
  familyDescription: string

  @ApiProperty()
  workflowVpcId: number
}
