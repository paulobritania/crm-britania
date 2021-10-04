export class UserProfilesDetailsDto {
  userProfiles: string

  accesses: string

  accessesPermissionsAndFields: Record<string, string>[]
}
