import { createParamDecorator, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export const BritaniaAuth = createParamDecorator((data, request) => {
  let { authorization } = request.args[0].headers

  if (!authorization) throw new UnauthorizedException()

  const options = {
    secret: process.env.JWT_SECRET_KEY,
    verifyOptions: {
      ignoreExpiration: true
    }
  }

  const jwtService = new JwtService(options)

  authorization = authorization.replace('Bearer ', '')

  const token = jwtService.verify(authorization)

  return token && data ? token[data] : { ...token, authorization }
})
