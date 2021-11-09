import {
  Injectable,
  HttpService,
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common'
import * as qs from 'qs'

import { EstablishmentsDto } from './dtos/establishments.dto'
import { EstablishmentDto } from './dtos/establishment.dto'
import { EstablishmentsQueryDto } from './dtos/establishmentsQuery.dto'
import { EstablishmentsResponseDto } from './dtos/establishmentsResponse.dto'

@Injectable()
export class EstablishmentsService {
  private readonly establishmentsUrl = process.env.BRITANIA_EMPRESA_URL

  constructor(private httpService: HttpService) {}

  async getEstablishments(
    query: EstablishmentsQueryDto,
    tokenBritania: string
  ): Promise<EstablishmentsDto[]> {
    try {
      const queryParams = qs.stringify({
        page: query.page,
        pageSize: query.pageSize,
        nomeEmpresa: query.description,
        codigoEmpresa: query.code
      })

      const { data } = await this.httpService
        .get<EstablishmentsResponseDto>(
          `${ this.establishmentsUrl }/api/v1/Empresa?${ queryParams }`,
          {
            headers: { Authorization: `Bearer ${ tokenBritania }` }
          }
        )
        .toPromise()

      const establishments: EstablishmentsDto[] = data.empresas.map(
        (establishment) => ({
          establishmentCode: establishment.codigoempresa,
          establishmentDescription: establishment.nomeempresa
        })
      )

      return establishments
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de estabelecimentos'
      )
    }
  }

  async getOneEstablishment(
    establishmentCode: number,
    tokenBritania: string
  ): Promise<EstablishmentDto> {
    try {
      const { data } = await this.httpService
        .get<EstablishmentDto>(
          `${ this.establishmentsUrl }/api/v1/Empresa/${establishmentCode}`,
          {
            headers: { Authorization: `Bearer ${ tokenBritania }` }
          }
        )
        .toPromise()

      const establishment: EstablishmentDto = data

      return establishment
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de estabelecimentos'
      )
    }
  }
}
