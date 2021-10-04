import {
  HttpModule, HttpService, InternalServerErrorException, UnauthorizedException
} from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { of, throwError } from 'rxjs'

import { InternalErrorResponse, OkResponse, UnauthorizedResponse } from '../../utils/mocks/AxiosResponses'
import { BritaniaServiceImpl } from './britania.service'
import { BritaniaLoginResponseDto } from './dtos/britaniaLoginResponse.dto'

describe('BritaniaSvc', () => {
  let service: BritaniaServiceImpl
  let httpService: HttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BritaniaServiceImpl]
    }).compile()

    service = module.get<BritaniaServiceImpl>(BritaniaServiceImpl)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('login', () => {
    it('should throw a unauthorized error', async () => {
      const apiResponse = UnauthorizedResponse()

      const params = {
        userName: 'test',
        password: 'test'
      }

      let error = null

      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.login(params)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(UnauthorizedException)
    })

    it('should throw a internal error', async () => {
      const apiResponse = InternalErrorResponse()

      const params = {
        userName: 'eduardo.hirt.meta',
        password: 'test'
      }

      let error = null

      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.login(params)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should return a token', async () => {
      const obj: BritaniaLoginResponseDto = {
        token: 'test',
        expiration: 'bearer',
        id: 'test',
        source: 'test',
        data: 'test'
      }

      const apiResponse = OkResponse(obj)

      const params = {
        userName: 'eduardo.hirt.meta',
        password: 'test'
      }

      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(apiResponse))


      const response = await service.login(params)

      expect(response).toEqual(obj)
    })
  })
})
