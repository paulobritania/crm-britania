import { AuthenticateDto } from '../authentication/dto/authenticate.dto'
import { BritaniaLoginResponseDto } from './dtos/britaniaLoginResponse.dto'

export interface BritaniaService {
  login(payload: AuthenticateDto): Promise<BritaniaLoginResponseDto>;
}
