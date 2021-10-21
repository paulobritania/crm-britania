import {
  HttpException,
  HttpService,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import * as qs from 'qs'

import { uniqBy } from 'lodash'

import { FamiliesResponseDto } from './dtos/families/familiesResponse.dto'
import { FamilyDto } from './dtos/families/family.dto'
import { FamilyQueryDto } from './dtos/families/familyQuery.dto'
import { LineDto } from './dtos/lines/lines.dto'
import { FindAllLinesQueryDto } from './dtos/lines/linesQuery.dto'
import { FindAllLinesResponseDto } from './dtos/lines/linesResponse.dto'
import { MasterLineDto } from './dtos/masterLines/masterLine.dto'
import { FindAllMasterLinesResponseDto } from './dtos/masterLines/masterLinesResponse.dto'

@Injectable()
export class LinesService {
  private readonly linesUrl: string

  constructor(private httpService: HttpService) {
    this.linesUrl = process.env.BRITANIA_CLIENTE_HIERARQUIA
  }

  /**
   * Busca todas as linhas e retorna sem duplicações
   * @param tokenBritania string
   * @returns FindAllLinesResponseDto
   */
  async findAll(
    query: FindAllLinesQueryDto,
    tokenBritania: string
  ): Promise<LineDto[]> {
    const lines = await this.findAllLines(query, tokenBritania)

    return uniqBy(lines, 'lineCode')
  }

  /**
   * Retorna todas as linhas
   * @param tokenBritania string
   */
  async findAllLines(
    query: FindAllLinesQueryDto,
    tokenBritania: string
  ): Promise<LineDto[]> {
    const headers = { Authorization: `Bearer ${ tokenBritania }` }

    const filter = qs.stringify({
      descricaoLinha: query.description,
      codigoLinhaPai: query.lineMasterCode,
      codigoCliente: query.clientTotvsCode
    })

    try {
      const { data } = await this.httpService
        .get<FindAllLinesResponseDto>(
          `${ this.linesUrl }/api/v1/Linha?${ filter }`,
          { headers }
        )
        .toPromise()

      return data.linha.map(
        (line) =>
          ({
            lineCode: line.codigolinha,
            lineDescription: line.descricaolinha
          } as LineDto)
      )
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de linhas'
      )
    }
  }

  /**
   * Busca todas as linhas pai
   * @param tokenBritania string
   * @returns MasterLinesDto[]
   */
  async findAllMasterLines(tokenBritania: string): Promise<MasterLineDto[]> {
    const headers = { Authorization: `Bearer ${ tokenBritania }` }

    try {
      const { data } = await this.httpService
        .get<FindAllMasterLinesResponseDto>(
          `${ this.linesUrl }/api/v1/LinhaPai`,
          { headers }
        )
        .toPromise()

      return data.linhaPai.map((masterLine) => ({
        masterLineCode: masterLine.codigolinhapai,
        masterLineDescription: masterLine.descricaolinhapai
      }))
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de linha pai'
      )
    }
  }

  /**
   * Busca as famílias
   * @param query FamilyQueryDto
   * @param tokenBritania string
   */
  async findAllFamilies(
    query: FamilyQueryDto,
    authToken: string
  ): Promise<FamilyDto[]> {
    try {
      const filter = qs.stringify({
        codigofamiliamaterial: query.code,
        descricaoFamiliaMaterial: query.description,
        codigoLinhaPai: query.lineMasterCodes,
        codigoLinha: query.lines,
        codigoCliente: query.clientTotvsCode
      })

      const { data } = await this.httpService
        .get<FamiliesResponseDto>(
          `${ this.linesUrl }/api/v1/FamiliaMaterial?${ filter }`,
          { headers: { Authorization: `Bearer ${ authToken }` } }
        )
        .toPromise()

      return data.familiaMaterial.map(
        (family) =>
          ({
            familyCode: family.codigofamiliamaterial,
            familyDescription: family.descricaofamiliamaterial
          } as FamilyDto)
      )
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de famílias'
      )
    }
  }
}
