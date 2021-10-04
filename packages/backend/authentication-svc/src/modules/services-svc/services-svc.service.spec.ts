import {
  HttpModule,
  HttpService,
  InternalServerErrorException
} from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { of, throwError } from 'rxjs'

import {
  InternalErrorResponse,
  OkResponse
} from '../../utils/mocks/AxiosResponses'
import { GetUserByUsernameResponseDto } from './dtos/getUserByUsernameResponse.dto'
import { GetUserDataResponseDto } from './dtos/getUserDataResponse.dto'
import { GetUserProfilesDetailsResponseDto } from './dtos/getUserProfilesDetailsResponse.dto'
import { GetUserProfilesResponseDto } from './dtos/getUserProfilesResponse.dto'
import { ServicesServiceImpl } from './services-svc.service'

describe('ServicesSvc', () => {
  let service: ServicesServiceImpl
  let httpService: HttpService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        JwtModule.registerAsync({
          useFactory: async () => {
            return {
              secret: 'test',
              signOptions: {
                expiresIn: 3600
              }
            }
          }
        })
      ],
      providers: [ServicesServiceImpl]
    }).compile()

    service = module.get<ServicesServiceImpl>(ServicesServiceImpl)
    httpService = module.get<HttpService>(HttpService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getUserByUsername', () => {
    it('should throw a internal error', async () => {
      const apiResponse = InternalErrorResponse()

      const username = 'test'

      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.getUserByUsername(username)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should return a user', async () => {
      const obj: GetUserByUsernameResponseDto = {
        id: 1
      }

      const apiResponse = OkResponse(obj)

      const username = 'test'

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResponse))

      const response = await service.getUserByUsername(username)

      expect(response).toEqual(obj)
    })
  })

  describe('getUserProfiles', () => {
    it('should return internal server error', async () => {
      const apiResponse = InternalErrorResponse()

      const token = 'test'

      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.getUserProfiles(token)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should return user profiles', async () => {
      const obj: GetUserProfilesResponseDto = {
        data: [1]
      }

      const apiResponse = OkResponse(obj)

      const token = 'test'

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResponse))

      const response = await service.getUserProfiles(token)

      expect(response).toEqual(obj)
    })
  })

  describe('getUserProfilesDetails', () => {
    it('should return internal server error', async () => {
      const apiResponse = InternalErrorResponse()

      const userId = 1

      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      const tokenSpy = jest
        .spyOn(service, 'createToken')
        .mockReturnValue('token')

      try {
        await service.getUserProfilesDetails(userId)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)

      expect(tokenSpy).toHaveBeenCalledTimes(1)
    })

    it('should return user profiles details', async () => {
      const obj: GetUserProfilesDetailsResponseDto[] = [
        {
          name: 'TEST',
          accesses: [
            {
              name: 'TEST',
              permissions: ['TEST'],
              fields: ['TEST']
            }
          ]
        }
      ]

      const apiResponse = OkResponse(obj)

      const userId = 1

      const tokenSpy = jest
        .spyOn(service, 'createToken')
        .mockReturnValue('token')

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResponse))

      const response = await service.getUserProfilesDetails(userId)

      expect(response).toEqual(obj)

      expect(tokenSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('createToken', () => {
    it('should return a new token', () => {
      const token = 'token'

      const jwtSign = jest.spyOn(jwtService, 'sign').mockReturnValue(token)

      const response = service.createToken()

      expect(response).toEqual(token)

      expect(jwtSign).toHaveBeenCalledTimes(1)
    })
  })

  describe('getUserData', () => {
    it('should return internal server error', async () => {
      const apiResponse = InternalErrorResponse()

      const token = 'test'

      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.getUserData(token)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should return user profiles', async () => {
      const obj: GetUserDataResponseDto = {
        id: 1,
        email: 'test',
        file: null,
        customerHierarchyEnabled: false,
        isActive: true,
        phone: null,
        representativeCodes: null,
        substituteUser: null,
        substituteUserEndDate: null,
        substituteUserId: null,
        substituteUserStartDate: null,
        userProfiles: null,
        username: 'test'
      }

      const apiResponse = OkResponse(obj)

      const token = 'test'

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResponse))

      const response = await service.getUserData(token)

      expect(response).toEqual(obj)
    })
  })
})
