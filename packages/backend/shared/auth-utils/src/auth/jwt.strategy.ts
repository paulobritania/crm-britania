import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'

import { JwtPayload } from '../dto/jwtPayload.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY
    })
  }

  async validate(
    payload: JwtPayload,
    done: VerifiedCallback
  ): Promise<any | UnauthorizedException> {
    try {
      const { userId, tokenBritania } = payload

      if (!userId || !tokenBritania) throw new UnauthorizedException()

      return done(null, tokenBritania, userId)
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
