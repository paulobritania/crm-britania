import { GetUserDataResponseDto } from '../../services-svc/dtos/getUserDataResponse.dto'
import { Token } from './token.dto'

export interface LoginResponseDto extends Token {
  user: GetUserDataResponseDto
}
