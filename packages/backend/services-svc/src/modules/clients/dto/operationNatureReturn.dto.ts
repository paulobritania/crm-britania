import { ApiProperty } from '@nestjs/swagger'

export class OperationNatureReturnDto {
  @ApiProperty()
  code: string

  @ApiProperty()
  description: string
}
