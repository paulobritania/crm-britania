import {
  Injectable,
  Inject,
  UnauthorizedException,
  HttpException,
  InternalServerErrorException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { BritaniaService } from '../britania-svc/britania.interface'
import { ServicesService } from '../services-svc/services-svc.interface'
import { AuthenticateDto } from './dto/authenticate.dto'
import { JwtPayload } from './dto/jwtPayload.dto'
import { LoginResponseDto } from './dto/loginResponse.dto'
import { Token } from './dto/token.dto'
import { UserProfilesDetailsDto } from './dto/userProfilesDetails.dto'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

@Injectable()
export class AuthenticationServiceImpl {
  constructor(
    private jwtService: JwtService,
    @Inject('BritaniaService') private britaniaService: BritaniaService,
    @Inject('ServicesService') private servicesService: ServicesService
  ) {}

  async login(payload: AuthenticateDto): Promise<LoginResponseDto> {
    const user = await this.servicesService.getUserByUsername(payload.userName)

    if (!user)
      throw new UnauthorizedException({
        message: 'Usuário e/ou senha incorretos',
        field: 'username'
      })

    let tokenBritania = null

    try {
      const { token } = await this.britaniaService.login(payload)

      tokenBritania = token
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao realizar o login'
      )
    }

    const { accesses, accessesPermissionsAndFields, userProfiles } =
      await this.getUserProfilesDetails(user.id)

    const tokenPayload: JwtPayload = {
      tokenBritania,
      userId: user.id,
      profiles: userProfiles,
      accesses,
      ...Object.assign({}, ...accessesPermissionsAndFields)
    }

    const token = this.createToken(tokenPayload)

    const userData = await this.servicesService.getUserData(token.accessToken)

    return {
      ...token,
      user: userData
    }
  }

  async getUserProfilesDetails(
    userId: number
  ): Promise<UserProfilesDetailsDto> {
    const userProfileDetails =
      await this.servicesService.getUserProfilesDetails(userId)

    const userProfiles: string[] = []
    const accesses: string[] = []
    const accessesPermissionsAndFields: Record<string, string>[] = []
    const permissionsAndFields: Record<
      string,
      {
        permissions: string[] | string
        fields: string[] | string
      }
    >[] = []

    userProfileDetails.forEach((profile) => {
      userProfiles.push(profile.name)

      profile.accesses.forEach((access) => {
        if (!accesses.includes(access.name)) {
          accesses.push(access.name)
          permissionsAndFields.push({
            [access.name]: {
              permissions: access.permissions,
              fields: access.fields
            }
          })
        } else {
          const accessPermissionsAndFields = permissionsAndFields.find(
            (accessPerm) => access.name in accessPerm
          )

          access.permissions.forEach((permission) => {
            if (
              !accessPermissionsAndFields[access.name].permissions.includes(
                permission
              )
            )
              (
                accessPermissionsAndFields[access.name].permissions as string[]
              ).push(permission)
          })

          access.fields.forEach((field) => {
            if (!accessPermissionsAndFields[access.name].fields.includes(field))
              (accessPermissionsAndFields[access.name].fields as string[]).push(
                field
              )
          })
        }
      })
    })

    accesses.forEach((access) => {
      const accessPermissionsAndFields = permissionsAndFields.find(
        (permissionAndFields) => access in permissionAndFields
      )
      accessesPermissionsAndFields.push({
        [access]: JSON.stringify({
          permissions: (
            accessPermissionsAndFields[access].permissions as string[]
          ).join(','),
          fields: (accessPermissionsAndFields[access].fields as string[]).join(
            ','
          )
        })
      })
    })

    return {
      userProfiles: userProfiles.join(','),
      accesses: accesses.join(','),
      accessesPermissionsAndFields
    }
  }

  createToken(
    payload: JwtPayload,
    expires = process.env.JWT_EXPIRATION_TIME
  ): Token {
    const signedPayload = this.jwtService.sign(payload, {
      expiresIn: `${ expires }s`
    })

    const token: Token = {
      accessToken: signedPayload,
      tokenType: 'bearer',
      expiresIn: Number(expires),
      expiresAt: moment().add(Number(expires), 's').toDate()
    }

    return token
  }
}
