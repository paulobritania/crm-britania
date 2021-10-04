import { GetUserByUsernameResponseDto } from './dtos/getUserByUsernameResponse.dto'
import { GetUserDataResponseDto } from './dtos/getUserDataResponse.dto'
import { GetUserProfilesDetailsResponseDto } from './dtos/getUserProfilesDetailsResponse.dto'
import { GetUserProfilesResponseDto } from './dtos/getUserProfilesResponse.dto'

export interface ServicesService {
  getUserByUsername(username: string): Promise<GetUserByUsernameResponseDto>
  getUserProfiles(token: string): Promise<GetUserProfilesResponseDto>
  getUserData(token: string): Promise<GetUserDataResponseDto>
  getUserProfilesDetails(
    id: number
  ): Promise<GetUserProfilesDetailsResponseDto[]>
}
