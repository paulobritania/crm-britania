// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger'

class UserRepresentativeCodesDto {
  @ApiProperty()
  code: string | number

  @ApiProperty()
  name?: string
}

class UserProfilesDto {
  @ApiProperty()
  profileId: number

  @ApiProperty()
  name: string
}

class SubstituteUserDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string
}

class UserFileDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  filename: string

  @ApiProperty()
  path: string

  @ApiProperty()
  contentType: string
}

export class GetUserDataResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  email: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  customerHierarchyEnabled: boolean

  @ApiProperty()
  substituteUserId: number

  @ApiProperty()
  substituteUserStartDate: string

  @ApiProperty()
  substituteUserEndDate: string

  @ApiProperty()
  isActive: boolean

  @ApiProperty({ isArray: true, type: UserRepresentativeCodesDto })
  representativeCodes: UserRepresentativeCodesDto[]

  @ApiProperty({ isArray: true, type: UserProfilesDto })
  userProfiles: UserProfilesDto[]

  @ApiProperty({ type: UserFileDto })
  file: UserFileDto

  @ApiProperty({ type: SubstituteUserDto })
  substituteUser: SubstituteUserDto
}
