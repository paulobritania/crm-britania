import { ApiProperty } from '@nestjs/swagger'

export class RankingDto {
  @ApiProperty()
  alias: string

  @ApiProperty()
  description: string
}
