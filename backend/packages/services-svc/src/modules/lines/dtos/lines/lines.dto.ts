import { ApiProperty } from '@nestjs/swagger'

export class LineDto {
  @ApiProperty()
  lineCode: number

  @ApiProperty()
  lineDescription: string
}
