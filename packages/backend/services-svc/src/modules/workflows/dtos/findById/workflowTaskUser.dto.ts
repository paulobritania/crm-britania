import { ApiProperty } from '@nestjs/swagger'

export class WorkflowTaskUserDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string
}
