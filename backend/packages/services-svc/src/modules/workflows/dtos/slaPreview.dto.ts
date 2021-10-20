import { ApiProperty } from '@nestjs/swagger'

export class SlaPreviewDto {
  @ApiProperty()
  red: number

  @ApiProperty()
  yellow: number

  @ApiProperty()
  green: number
}
