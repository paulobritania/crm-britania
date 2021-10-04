import {
  HttpService,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'

import { AuthenticateDto } from '../authentication/dto/authenticate.dto'
import { BritaniaService } from './britania.interface'
import { BritaniaLoginResponseDto } from './dtos/britaniaLoginResponse.dto'

@Injectable()
export class BritaniaServiceImpl implements BritaniaService {
  constructor(private httpService: HttpService) {}

  private apiBritaniaUrl = process.env.BRITANIA_LOGIN_URL

  async login(payload: AuthenticateDto): Promise<BritaniaLoginResponseDto> {
    try {
      const response = await this.httpService
        .post(this.apiBritaniaUrl, payload)
        .toPromise()

      return response.data
    } catch (error) {
      const errorData =
        error?.response?.status !== 500 ? error.response.data : null

      if (errorData) {
        throw new UnauthorizedException({
          message: 'Usuário e/ou senha incorretos',
          field: 'username'
        })
      }

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de autenticação'
      )
    }
  }
}
