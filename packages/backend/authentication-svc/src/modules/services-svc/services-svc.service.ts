import {
  HttpService,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { GetUserByUsernameResponseDto } from './dtos/getUserByUsernameResponse.dto'
import { GetUserDataResponseDto } from './dtos/getUserDataResponse.dto'
import { GetUserProfilesDetailsResponseDto } from './dtos/getUserProfilesDetailsResponse.dto'
import { GetUserProfilesResponseDto } from './dtos/getUserProfilesResponse.dto'
import { ServicesService } from './services-svc.interface'

@Injectable()
export class ServicesServiceImpl implements ServicesService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService
  ) {}

  async getUserData(token: string): Promise<GetUserDataResponseDto> {
    const getUserDataUrl = `${ this.servicesUrl }/users/personal/data`

    try {
      const { data } = await this.httpService
        .get(getUserDataUrl, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        .toPromise()

      return data
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao consultar os dados do usuário'
      )
    }
  }

  private servicesUrl = process.env.SERVICES_URL

  async getUserByUsername(
    username: string
  ): Promise<GetUserByUsernameResponseDto> {
    const getUserUrl = `${ this.servicesUrl }/users/username`

    try {
      const { data: user } = await this.httpService
        .get(`${ getUserUrl }/${ username }`)
        .toPromise()

      return user
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao validar o cadastro do usuário'
      )
    }
  }

  async getUserProfiles(token: string): Promise<GetUserProfilesResponseDto> {
    const getUserProfilesUrl = `${ this.servicesUrl }/users/personal/profiles`

    try {
      const { data } = await this.httpService
        .get(getUserProfilesUrl, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        .toPromise()

      return data
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao consultar os perfis do usuário'
      )
    }
  }

  async getUserProfilesDetails(
    id: number
  ): Promise<GetUserProfilesDetailsResponseDto[]> {
    const getUserProfilesDetailsUrl = `${ this.servicesUrl }/users/${ id }/profiles/details`
    const token = this.createToken()

    try {
      const { data } = await this.httpService
        .get(getUserProfilesDetailsUrl, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        .toPromise()

      return data
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao consultar os detalhes do usuário'
      )
    }
  }

  createToken(): string {
    return this.jwtService.sign(
      {},
      {
        expiresIn: `${ process.env.INTERNAL_JWT_EXPIRATION_TIME }s`,
        secret: process.env.INTERNAL_JWT_SECRET_KEY
      }
    )
  }
}
