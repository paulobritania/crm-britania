import { ApiProperty } from '@nestjs/swagger'

export class ListWorkTaskDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string
}
