import { ApiProperty } from '@nestjs/swagger'

export class RepresentativeDto {
  @ApiProperty()
  code: number

  @ApiProperty()
  name: string
}
