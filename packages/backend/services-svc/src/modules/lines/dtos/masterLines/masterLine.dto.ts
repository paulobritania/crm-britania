import { ApiProperty } from '@nestjs/swagger'

export class MasterLineDto {
  @ApiProperty()
  masterLineCode: number

  @ApiProperty()
  masterLineDescription: string
}
