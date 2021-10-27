import { ApiProperty } from '@nestjs/swagger'

export class PagedResult<T> {
  constructor(totalRegisters: number, data: T[]) {
    this.totalRegisters = totalRegisters
    this.data = data
  }

  @ApiProperty()
  totalRegisters: number

  @ApiProperty()
  data: T[]
}
