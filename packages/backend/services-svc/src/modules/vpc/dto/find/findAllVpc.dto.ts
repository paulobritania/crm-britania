import { ApiProperty } from '@nestjs/swagger'

export class FindAllVpcDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  requestNumber: string

  @ApiProperty()
  parentCompanyName: string

  @ApiProperty()
  situation: string

  @ApiProperty()
  linesDescription: string

  @ApiProperty()
  foundsType: string

  @ApiProperty()
  deploymentDate: string

  @ApiProperty()
  value: number

  @ApiProperty()
  taskTitle: string

  @ApiProperty()
  taskResponsible: string

  @ApiProperty()
  taskProfile: string

  @ApiProperty()
  sla: string
}
