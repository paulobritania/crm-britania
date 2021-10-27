import { ApiProperty } from '@nestjs/swagger'

export class HierarchyLevelsDto {
  @ApiProperty()
  code: number

  @ApiProperty()
  description: string
}
