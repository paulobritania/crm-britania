/* eslint-disable max-classes-per-file */
class UserProfilesAccessesDetailsDto {
  name: string

  permissions: string[]

  fields: string[]
}

export class GetUserProfilesDetailsResponseDto {
  name: string

  accesses: UserProfilesAccessesDetailsDto[]
}
