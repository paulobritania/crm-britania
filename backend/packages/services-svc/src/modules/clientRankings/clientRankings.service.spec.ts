import {
  BadRequestException,
  InternalServerErrorException,
  Provider
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { MockEntity } from '../../utils/mocks/Entity'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { User } from '../users/entities/user.entity'
import { ClientRankingsService } from './clientRankings.service'
import { UpdateClientRankingDto } from './dto/update/updateClientRanking.dto'
import { Ranking } from './entities/ranking.entity'
import { RankingIndicator } from './entities/rankingIndicator.entity'
import { RankingIndicatorValue } from './entities/rankingIndicatorValue.entity'
import { SymbolsEnum } from './enum/symbols.enum'

describe('ClientRankingsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: ClientRankingsService
  let user: User
  let ranking: Ranking
  let rankingIndicator: RankingIndicator
  let rankingIndicatorValue: RankingIndicatorValue
  let invalidRankingIndicatorValue: RankingIndicatorValue
  let formattedRankingIndicatorValue: UpdateClientRankingDto

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }

    user = MockEntity({
      id: 1,
      imageId: null,
      username: 'testuser',
      email: 'valid@email.com',
      phone: null,
      customerHierarchyEnabled: false,
      representativeCodes: null,
      userProfile: null,
      file: null,
      substituteUser: null,
      userProfiles: null,
      substituteUserId: null,
      isActive: true,
      createdBy: null,
      createdAt: new Date(),
      updatedBy: null,
      updatedAt: new Date(),
      substituteUserStartDate: null,
      substituteUserEndDate: null
    })

    ranking = MockEntity({
      id: 1,
      description: 'Diamante',
      alias: 'DIAMOND'
    })

    rankingIndicator = MockEntity({
      id: 1,
      description: '% Crescimento',
      alias: 'GROWTH'
    })

    rankingIndicatorValue = MockEntity({
      rankingId: 1,
      rankingIndicatorId: 1,
      symbol: '>',
      goal: 10.0,
      weight: 1,
      updatedBy: 1,
      updatedAt: '2021-04-29T17:02:20.646Z',
      ranking,
      rankingIndicator,
      user
    })

    invalidRankingIndicatorValue = MockEntity({
      rankingId: 0,
      rankingIndicatorId: 0,
      symbol: 'X',
      goal: 10.0,
      weight: 1,
      updatedBy: 1,
      updatedAt: '2021-04-29T17:02:20.646Z',
      ranking,
      rankingIndicator,
      user
    })

    formattedRankingIndicatorValue = {
      indicators: {
        DIAMOND: {
          id: 1,
          GROWTH: {
            id: 1,
            symbol: '>' as SymbolsEnum,
            goal: 10,
            weight: 1
          },
          DEVOLUTION: {
            id: 2,
            symbol: '>=' as SymbolsEnum,
            goal: 20,
            weight: 1.5
          },
          PRODUCT_INTRODUCTION: {
            id: 3,
            symbol: '>' as SymbolsEnum,
            goal: 30,
            weight: 2
          },
          PAYMENT_TERMS: {
            id: 4,
            symbol: '>' as SymbolsEnum,
            goal: 40,
            weight: 2.5
          }
        },
        GOLD: {
          id: 2,
          GROWTH: {
            id: 1,
            symbol: '>' as SymbolsEnum,
            goal: 10,
            weight: 1
          },
          DEVOLUTION: {
            id: 2,
            symbol: '>=' as SymbolsEnum,
            goal: 20,
            weight: 1.5
          },
          PRODUCT_INTRODUCTION: {
            id: 3,
            symbol: '>' as SymbolsEnum,
            goal: 30,
            weight: 2
          },
          PAYMENT_TERMS: {
            id: 4,
            symbol: '>' as SymbolsEnum,
            goal: 40,
            weight: 2.5
          }
        },
        SILVER: {
          id: 3,
          GROWTH: {
            id: 1,
            symbol: '>' as SymbolsEnum,
            goal: 10,
            weight: 1
          },
          DEVOLUTION: {
            id: 2,
            symbol: '>=' as SymbolsEnum,
            goal: 20,
            weight: 1.5
          },
          PRODUCT_INTRODUCTION: {
            id: 3,
            symbol: '>' as SymbolsEnum,
            goal: 30,
            weight: 2
          },
          PAYMENT_TERMS: {
            id: 4,
            symbol: '>' as SymbolsEnum,
            goal: 40,
            weight: 2.5
          }
        },
        BRONZE: {
          id: 4,
          GROWTH: {
            id: 1,
            symbol: '>' as SymbolsEnum,
            goal: 10,
            weight: 1
          },
          DEVOLUTION: {
            id: 2,
            symbol: '>=' as SymbolsEnum,
            goal: 20,
            weight: 1.5
          },
          PRODUCT_INTRODUCTION: {
            id: 3,
            symbol: '>' as SymbolsEnum,
            goal: 30,
            weight: 2
          },
          PAYMENT_TERMS: {
            id: 4,
            symbol: '>' as SymbolsEnum,
            goal: 40,
            weight: 2.5
          }
        }
      }
    }
  })

  beforeEach(async () => {
    mockModel = MockModel()

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        DatabaseProviderMock,
        ClientRankingsService,
        {
          provide: getModelToken(RankingIndicatorValue),
          useValue: mockModel
        },
        {
          provide: getModelToken(Ranking),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<ClientRankingsService>(ClientRankingsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('find', () => {
    it('should return an ranking indicator', async () => {
      mockModel.findOne.mockReturnValue(rankingIndicatorValue)
      const result = await service.findRankingIndicatorValue(
        rankingIndicatorValue.rankingId,
        rankingIndicatorValue.rankingIndicatorId
      )
      expect(result).toHaveProperty('symbol')
      expect(result.goal).toEqual(10.0)
    })

    it('should return all ranking indicators', async () => {
      mockModel.findAll.mockReturnValue([rankingIndicatorValue])
      const result = await service.findAll()
      expect(result).toHaveProperty('indicators')
      expect(result.indicators).toHaveProperty('DIAMOND')
      expect(result.indicators.DIAMOND.GROWTH.description).toEqual(
        '% Crescimento'
      )
    })
  })

  describe('update', () => {
    it('should update an ranking indicator value with a param transaction', async () => {
      const findRankingIndicatorValueSpy = jest
        .spyOn(service, 'findRankingIndicatorValue')
        .mockResolvedValue(rankingIndicatorValue)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      const updateSpy = mockModel.update.mockImplementationOnce(() =>
        Promise.resolve()
      )
      await service.updateRankingIndicatorValue(
        rankingIndicatorValue,
        transaction as any
      )

      expect(findRankingIndicatorValueSpy).toHaveBeenCalledTimes(1)
      expect(updateSpy).toHaveBeenCalledTimes(1)
      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should update an ranking indicator value without a param transaction', async () => {
      const findRankingIndicatorValueSpy = jest
        .spyOn(service, 'findRankingIndicatorValue')
        .mockResolvedValue(rankingIndicatorValue)

      const updateSpy = mockModel.update.mockImplementationOnce(() =>
        Promise.resolve()
      )
      await service.updateRankingIndicatorValue(rankingIndicatorValue, null)
      expect(findRankingIndicatorValueSpy).toHaveBeenCalledTimes(1)
      expect(updateSpy).toHaveBeenCalledTimes(1)
    })

    it('should not update a ranking indicator value without transaction param because his values isnt valid', async () => {
      let error = null

      const findRankingIndicatorValueSpy = jest
        .spyOn(service, 'findRankingIndicatorValue')
        .mockResolvedValue(undefined)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.updateRankingIndicatorValue(invalidRankingIndicatorValue)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual(
        `O Ranking ${ invalidRankingIndicatorValue.rankingId } e o indicador ${ invalidRankingIndicatorValue.rankingIndicatorId } não possuem valores cadastrados`
      )

      expect(findRankingIndicatorValueSpy).toHaveBeenCalledTimes(1)
      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should not update a ranking indicator value with transaction param because his values isnt valid', async () => {
      let error = null

      jest
        .spyOn(service, 'findRankingIndicatorValue')
        .mockResolvedValue(undefined)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.updateRankingIndicatorValue(
          invalidRankingIndicatorValue,
          transaction as any
        )
      } catch (err) {
        error = err
      }

      expect(error.message).toEqual(
        `O Ranking ${ invalidRankingIndicatorValue.rankingId } e o indicador ${ invalidRankingIndicatorValue.rankingIndicatorId } não possuem valores cadastrados`
      )

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should throw a bad request when update a ranking indicator fails and make a rollback', async () => {
      let error = null

      const findRankingIndicatorValueSpy = jest
        .spyOn(service, 'findRankingIndicatorValue')
        .mockRejectedValue(new Error())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.updateRankingIndicatorValue(rankingIndicatorValue)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(InternalServerErrorException)

      expect(findRankingIndicatorValueSpy).toHaveBeenCalledTimes(1)
      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should update all ranking indicators', async () => {
      const updateRankingIndicatorValueSpy = jest
        .spyOn(service, 'updateRankingIndicatorValue')
        .mockImplementationOnce(() => Promise.resolve())

      const findRankingIndicatorValueSpy = jest
        .spyOn(service, 'findRankingIndicatorValue')
        .mockResolvedValue(rankingIndicatorValue)

      const updateSpy = mockModel.update.mockImplementationOnce(() =>
        Promise.resolve()
      )

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(false)

      await service.update(formattedRankingIndicatorValue, user.id)
      expect(updateRankingIndicatorValueSpy).toHaveBeenCalledTimes(16)
      expect(findRankingIndicatorValueSpy).toHaveBeenCalledTimes(15)
      expect(updateSpy).toHaveBeenCalledTimes(15)
      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should throw an error when update all ranking indicators and make a rollback', async () => {
      let error = null
      const errorMessage = 'Falha ao atualizar ranking indicator value'
      const updateRankingIndicatorValueSpy = jest
        .spyOn(service, 'updateRankingIndicatorValue')
        .mockRejectedValue(new BadRequestException(errorMessage))

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(false)

      try {
        await service.update(formattedRankingIndicatorValue, user.id)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.message).toEqual(errorMessage)

      expect(updateRankingIndicatorValueSpy).toHaveBeenCalled()
      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should throw a bad request when update all ranking indicators fails and make a rollback', async () => {
      let error = null
      const updateRankingIndicatorValueSpy = jest
        .spyOn(service, 'updateRankingIndicatorValue')
        .mockRejectedValue(new Error())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(false)

      try {
        await service.update(formattedRankingIndicatorValue, user.id)
      } catch (err) {
        error = err
      }

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(InternalServerErrorException)

      expect(updateRankingIndicatorValueSpy).toHaveBeenCalled()
      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })
  })
})
