import { ApiProperty } from '@nestjs/swagger'

export class RequestReturnDto {
  @ApiProperty()
  code: number

  @ApiProperty()
  name: string

  @ApiProperty()
  value: number
}
