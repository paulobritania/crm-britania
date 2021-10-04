interface UserProfilesAccessesDetailsDto {
  name: string
  permissions: string[]
  fields: string[]
}

export interface GetUserProfilesDetailsResponseDto {
  name: string,
  accesses: UserProfilesAccessesDetailsDto[]
}
