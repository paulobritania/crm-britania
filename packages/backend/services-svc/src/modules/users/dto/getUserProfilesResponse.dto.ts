import { ApiProperty } from '@nestjs/swagger'

export class GetUserProfilesResponseDto {
  @ApiProperty()
  data: number[]
}
