import { ApiProperty } from '@nestjs/swagger'

export class ClientRegionalManagerDto {
  @ApiProperty()
  approverDescription: string

  @ApiProperty()
  approverCode: number
}
