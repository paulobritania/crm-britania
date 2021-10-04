import { ApiProperty } from '@nestjs/swagger'

export class UserRegionalManagerDto {
  @ApiProperty()
  code: number

  @ApiProperty()
  description: string
}
