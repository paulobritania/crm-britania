import { HttpModule, UnauthorizedException } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { BritaniaService } from '../britania-svc/britania.interface'
import { BritaniaServiceImpl } from '../britania-svc/britania.service'
import { BritaniaLoginResponseDto } from '../britania-svc/dtos/britaniaLoginResponse.dto'
import { GetUserByUsernameResponseDto } from '../services-svc/dtos/getUserByUsernameResponse.dto'
import { GetUserDataResponseDto } from '../services-svc/dtos/getUserDataResponse.dto'
import { GetUserProfilesDetailsResponseDto } from '../services-svc/dtos/getUserProfilesDetailsResponse.dto'
import { ServicesService } from '../services-svc/services-svc.interface'
import { ServicesServiceImpl } from '../services-svc/services-svc.service'
import { AuthenticationServiceImpl } from './authentication.service'
import { AuthenticateDto } from './dto/authenticate.dto'
import { JwtPayload } from './dto/jwtPayload.dto'
import { LoginResponseDto } from './dto/loginResponse.dto'
import { Token } from './dto/token.dto'
import { UserProfilesDetailsDto } from './dto/userProfilesDetails.dto'

describe('Authentication service', () => {
  let service: AuthenticationServiceImpl
  let jwtService: JwtService
  let servicesService: ServicesService
  let britaniaService: BritaniaService

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
      providers: [
        AuthenticationServiceImpl,
        { provide: 'BritaniaService', useClass: BritaniaServiceImpl },
        { provide: 'ServicesService', useClass: ServicesServiceImpl }
      ]
    }).compile()

    service = module.get<AuthenticationServiceImpl>(AuthenticationServiceImpl)
    jwtService = module.get<JwtService>(JwtService)
    servicesService = module.get<ServicesService>('ServicesService')
    britaniaService = module.get<BritaniaService>('BritaniaService')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createToken', () => {
    it('should return a token', () => {
      const payload: JwtPayload = {
        tokenBritania: 'test',
        userId: 1,
        accesses: 'TEST',
        profiles: 'TEST'
      }

      jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => 'testToken')

      const response: Token = service.createToken(payload, '3600')

      expect(response).toBeDefined()
      expect(response).toHaveProperty('accessToken')
      expect(response).toHaveProperty('expiresIn')
    })

    it('should return a token with the default expirationTime', () => {
      const payload: JwtPayload = {
        tokenBritania: 'test',
        userId: 1,
        accesses: 'TEST',
        profiles: 'TEST'
      }

      jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => 'testToken')

      const response: Token = service.createToken(payload)

      expect(response).toBeDefined()
      expect(response).toHaveProperty('accessToken')
      expect(response).toHaveProperty('expiresIn')
    })
  })

  describe('login', () => {
    it('should log in a user successfully', async () => {
      const payload: AuthenticateDto = {
        userName: 'string',
        password: 'string'
      }
      const userResponse: GetUserByUsernameResponseDto = { id: 1 }
      const userDataResponse: GetUserDataResponseDto = {
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
      const userProfilesDetailsResponse: UserProfilesDetailsDto = {
        accesses: 'TEST',
        accessesPermissionsAndFields: [],
        userProfiles: 'TEST'
      }
      const loginResponse: BritaniaLoginResponseDto = {
        id: 'test',
        expiration: 'test',
        source: 'test',
        data: 'test',
        token: 'test'
      }
      const tokenResponse: LoginResponseDto = {
        accessToken: 'test',
        expiresIn: 1,
        user: userDataResponse
      }
      const jwtPayload: JwtPayload = {
        tokenBritania: loginResponse.token,
        userId: userResponse.id,
        profiles: userProfilesDetailsResponse.userProfiles,
        accesses: userProfilesDetailsResponse.accesses
      }

      const userSpy = jest
        .spyOn(servicesService, 'getUserByUsername')
        .mockResolvedValue(userResponse)
      const userProfilesDetailsSpy = jest
        .spyOn(service, 'getUserProfilesDetails')
        .mockResolvedValue(userProfilesDetailsResponse)
      const userDataSpy = jest
        .spyOn(servicesService, 'getUserData')
        .mockResolvedValue(userDataResponse)
      const loginSpy = jest
        .spyOn(britaniaService, 'login')
        .mockResolvedValue(loginResponse)
      const tokenSpy = jest
        .spyOn(service, 'createToken')
        .mockReturnValue(tokenResponse)

      const response = await service.login(payload)

      expect(userSpy).toHaveBeenCalledWith(payload.userName)
      expect(userSpy).toHaveBeenCalledTimes(1)

      expect(userProfilesDetailsSpy).toHaveBeenCalledWith(userResponse.id)
      expect(userProfilesDetailsSpy).toHaveBeenCalledTimes(1)

      expect(userDataSpy).toHaveBeenCalledTimes(1)

      expect(loginSpy).toHaveBeenCalledWith(payload)
      expect(loginSpy).toHaveBeenCalledTimes(1)

      expect(tokenSpy).toHaveBeenCalledWith(jwtPayload)
      expect(tokenSpy).toHaveBeenCalledTimes(1)

      expect(response).toEqual(tokenResponse)
    })

    it('should fail when the user is not found', async () => {
      const payload: AuthenticateDto = {
        userName: 'string',
        password: 'string'
      }
      const userResponse: GetUserByUsernameResponseDto = null
      let error = null

      const userSpy = jest
        .spyOn(servicesService, 'getUserByUsername')
        .mockResolvedValue(userResponse)
      const loginSpy = jest
        .spyOn(britaniaService, 'login')
        .mockResolvedValue(null)
      const tokenSpy = jest.spyOn(service, 'createToken').mockReturnValue(null)

      try {
        await service.login(payload)
      } catch (err) {
        error = err
      }

      expect(userSpy).toHaveBeenCalledWith(payload.userName)
      expect(userSpy).toHaveBeenCalledTimes(1)

      expect(loginSpy).toHaveBeenCalledTimes(0)

      expect(tokenSpy).toHaveBeenCalledTimes(0)

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(UnauthorizedException)
    })

    it('should fail when the britania login failed', async () => {
      const payload: AuthenticateDto = {
        userName: 'string',
        password: 'string'
      }
      const userResponse: GetUserByUsernameResponseDto = { id: 1 }
      let error = null

      const userSpy = jest
        .spyOn(servicesService, 'getUserByUsername')
        .mockResolvedValue(userResponse)
      const loginSpy = jest
        .spyOn(britaniaService, 'login')
        .mockRejectedValue(new UnauthorizedException())
      const tokenSpy = jest.spyOn(service, 'createToken').mockReturnValue(null)

      try {
        await service.login(payload)
      } catch (err) {
        error = err
      }

      expect(userSpy).toHaveBeenCalledWith(payload.userName)
      expect(userSpy).toHaveBeenCalledTimes(1)

      expect(loginSpy).toHaveBeenCalledTimes(1)

      expect(tokenSpy).toHaveBeenCalledTimes(0)

      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(UnauthorizedException)
    })
  })

  describe('getUserProfilesDetails', () => {
    it('should return user profiles, accesses, permissions and fields', async () => {
      const userId = 1
      const getUserProfilesDetailsResponse: GetUserProfilesDetailsResponseDto[] = [
        {
          name: 'PROFILE_NAME_1',
          accesses: [
            {
              name: 'ACCESS_1_ALIAS',
              fields: ['FIELD_1_ALIAS', 'FIELD_3_ALIAS'],
              permissions: ['PERMISSION_1_ALIAS', 'PERMISSION_3_ALIAS']
            }
          ]
        },
        {
          name: 'PROFILE_NAME_2',
          accesses: [
            {
              name: 'ACCESS_1_ALIAS',
              fields: ['FIELD_1_ALIAS', 'FIELD_2_ALIAS'],
              permissions: ['PERMISSION_1_ALIAS', 'PERMISSION_2_ALIAS']
            },
            {
              name: 'ACCESS_2_ALIAS',
              fields: ['FIELD_1_ALIAS'],
              permissions: ['PERMISSION_1_ALIAS']
            }
          ]
        }
      ]

      const Access1PermissionsAndFields = {
        permissions: 'PERMISSION_1_ALIAS,PERMISSION_3_ALIAS,PERMISSION_2_ALIAS',
        fields: 'FIELD_1_ALIAS,FIELD_3_ALIAS,FIELD_2_ALIAS'
      }

      const Access2PermissionsAndFields = {
        permissions: 'PERMISSION_1_ALIAS',
        fields: 'FIELD_1_ALIAS'
      }

      const expectedResponse: UserProfilesDetailsDto = {
        userProfiles: 'PROFILE_NAME_1,PROFILE_NAME_2',
        accesses: 'ACCESS_1_ALIAS,ACCESS_2_ALIAS',
        accessesPermissionsAndFields: [
          { ACCESS_1_ALIAS: JSON.stringify(Access1PermissionsAndFields) },
          { ACCESS_2_ALIAS: JSON.stringify(Access2PermissionsAndFields) }
        ]
      }

      const servicesSpy = jest
        .spyOn(servicesService, 'getUserProfilesDetails')
        .mockResolvedValue(getUserProfilesDetailsResponse)

      const response = await service.getUserProfilesDetails(userId)

      expect(response).toEqual(expectedResponse)

      expect(servicesSpy).toHaveBeenCalledTimes(1)
      expect(servicesSpy).toHaveBeenCalledWith(userId)
    })
  })
})
