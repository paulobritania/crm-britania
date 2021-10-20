import { BritaniaLoginResponseDto } from '../britania-svc/dtos/britaniaLoginResponse.dto'
import { AuthenticateDto } from './dto/authenticate.dto'
import { JwtPayload } from './dto/jwtPayload.dto'
import { Token } from './dto/token.dto'

export interface Authenticated {
  accessToken: string;
}

export interface AuthenticationService {
  login(payload: AuthenticateDto): Promise<Token>;
  createToken(payload: JwtPayload, expires: string): Token;
  getUser(username: string): BritaniaLoginResponseDto;
  loginBritania(payload: AuthenticateDto): BritaniaLoginResponseDto;
}
