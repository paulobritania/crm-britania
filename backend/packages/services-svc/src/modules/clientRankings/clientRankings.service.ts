/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize, Transaction } from 'sequelize'

import { User } from '../users/entities/user.entity'
import { FindAllClientRankingDto } from './dto/findAll/findAllClientRanking.dto'
import { IndicatorsDto } from './dto/findAll/indicators.dto'
import { IndicatorValuesDto } from './dto/findAll/indicatorValues.dto'
import { RankingsDto } from './dto/findAll/rankings.dto'
import { UpdateClientRankingDto } from './dto/update/updateClientRanking.dto'
import { Ranking } from './entities/ranking.entity'
import { RankingIndicator } from './entities/rankingIndicator.entity'
import { RankingIndicatorValue } from './entities/rankingIndicatorValue.entity'
import { IndicatorsEnum } from './enum/indicators.enum'
import { RankingsEnum } from './enum/rankings.enum'
import { SymbolsEnum } from './enum/symbols.enum'

const moment = require('moment')
@Injectable()
export class ClientRankingsService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Ranking) private rankingModel: typeof Ranking,
    @InjectModel(RankingIndicatorValue)
    private rankingIndicatorValueModel: typeof RankingIndicatorValue
  ) {}

  /**
   * Retorna todos os registros de ranking_indicator_values formatados
   */
  async findAll(): Promise<FindAllClientRankingDto> {
    const indicators = await this.rankingIndicatorValueModel.findAll({
      include: [
        {
          model: Ranking
        },
        {
          model: RankingIndicator
        },
        {
          model: User,
          attributes: ['id', 'username']
        }
      ]
    })

    const response = indicators
      .map((item) => item.toJSON() as RankingIndicatorValue)
      .reduce((obj, indicator) => {
        obj[indicator.ranking.alias] = obj[indicator.ranking.alias] || {}

        obj[indicator.ranking.alias].id = indicator.rankingId
        obj[indicator.ranking.alias].description = indicator.ranking.description

        obj[indicator.ranking.alias][indicator.rankingIndicator.alias] = {
          id: indicator.rankingIndicatorId,
          description: indicator.rankingIndicator.description,
          symbol: indicator.symbol,
          goal: indicator.goal,
          weight: indicator.weight
        }

        return obj
      }, {} as IndicatorsDto)

    return {
      updatedBy: indicators[0].user.username,
      updatedAt: indicators[0].updatedAt,
      indicators: response
    }
  }

  /**
   * Busca um registro de ranking_indicator_values e o atualiza
   * @param data RankingIndicatorValue
   * @param trx Transaction
   */
  async updateRankingIndicatorValue(
    data: RankingIndicatorValue,
    trx?: Transaction
  ): Promise<void> {
    const transaction = trx || (await this.db.transaction())
    try {
      const resource = await this.findRankingIndicatorValue(
        data.rankingId,
        data.rankingIndicatorId
      )

      if (!resource) {
        throw new BadRequestException(
          `O Ranking ${ data.rankingId } e o indicador ${ data.rankingIndicatorId } não possuem valores cadastrados`
        )
      }

      await this.rankingIndicatorValueModel.update(data, {
        where: {
          rankingId: data.rankingId,
          rankingIndicatorId: data.rankingIndicatorId
        },
        transaction
      })

      const log = {
        newData: data,
        oldData: resource.get({ plain: true }),
        userId: data.updatedBy,
        httpVerb: 'put',
        table: 'ranking_indicator_values'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()

      if (!trx) await transaction.commit()
    } catch (error) {
      if (!trx) await transaction.rollback()

      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Erro ao atualizar valores de um indicadores de ranking'
      )
    }
  }

  /**
   * Busca um registro de ranking_indicator_values e o retorna
   * @param rankingId number
   * @param rankingIndicatorId number
   * @returns RankingIndicatorValue
   */
  async findRankingIndicatorValue(
    rankingId: number,
    rankingIndicatorId: number
  ): Promise<RankingIndicatorValue> {
    return this.rankingIndicatorValueModel.findOne({
      where: {
        rankingId,
        rankingIndicatorId
      }
    })
  }

  /**
   * Atualiza os registros de ranking_indicator_values e os retorna
   * @param data UpdateUserDto
   * @param userId number
   */
  async update(
    data: UpdateClientRankingDto,
    userId: number
  ): Promise<RankingIndicatorValue[]> {
    const transaction = await this.db.transaction()
    try {
      const rankingIndicatorValues = []
      const rankings = Object.keys(RankingsEnum)
      const indicators = Object.keys(IndicatorsEnum)

      Object.keys(data.indicators)
        .filter((key) => rankings.includes(key))
        .forEach((key) => {
          rankingIndicatorValues.push(
            ...Object.keys(data.indicators[key])
              .filter((indicator) => indicators.includes(indicator))
              .map((indicator) => ({
                rankingId: data.indicators[key].id,
                rankingIndicatorId: data.indicators[key][indicator].id,
                symbol: data.indicators[key][indicator].symbol,
                goal: data.indicators[key][indicator].goal,
                weight: data.indicators[key][indicator].weight,
                updatedBy: userId,
                updatedAt: moment().utc()
              }))
          )
        })

      await Promise.all(
        rankingIndicatorValues.map(async (ranking) => {
          await this.updateRankingIndicatorValue(ranking, transaction)
        })
      )

      await transaction.commit()
      return rankingIndicatorValues
    } catch (error) {
      await transaction.rollback()
      if (error instanceof BadRequestException) throw error

      throw new InternalServerErrorException(
        'Erro ao atualizar valores dos indicadores de ranking'
      )
    }
  }

  /**
   * Retorna uma lista com todos os rankings
   * @returns Ranking[]
   */
  async findAllRankings(): Promise<Ranking[]> {
    return this.rankingModel.findAll()
  }

  /**
   * Calcula o peso de um determinado ranking indicator
   * @param indicatorValue number
   * @param indicatorsEnum IndicatorsEnum
   * @param rankings RankingsDto[]
   * @returns number
   */
  calculateRanking(
    indicatorValue: number,
    indicatorsEnum: IndicatorsEnum,
    rankings: RankingsDto[]
  ): number {
    const indicators = rankings.map(
      (ranking) => ranking[indicatorsEnum] as IndicatorValuesDto
    )

    return indicators
      .sort((a, b) => (a.weight > b.weight ? 1 : -1))
      .reduce((weight, indicator) => {
        switch (indicator.symbol) {
          case SymbolsEnum.IsGreaterOrEquals:
            if (indicatorValue >= indicator.goal) weight = indicator.weight
            break
          case SymbolsEnum.IsGreaterThan:
            if (indicatorValue > indicator.goal) weight = indicator.weight
            break
          case SymbolsEnum.IsEqualsTo:
            if (indicatorValue === indicator.goal) weight = indicator.weight
            break
          case SymbolsEnum.IsLessThan:
            if (indicatorValue < indicator.goal) weight = indicator.weight
            break
          case SymbolsEnum.IsLessOrEquals:
            if (indicatorValue <= indicator.goal) weight = indicator.weight
            break
          default:
            return weight
        }

        return weight
      }, 0)
  }

  /**
   * Busca um ranking por id
   * @param rankingId number
   */
  findRankingById(id: number): PromiseLike<Ranking> {
    return this.rankingModel.findByPk(id)
  }
}
