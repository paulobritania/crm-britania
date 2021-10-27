import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

import { ENABLED_ACCESS } from '../decorators/access.auth'
import { ACCESS_NOT_REQUIRED } from '../decorators/accessNotRequired.auth'
import { INTERNAL_ROUTE } from '../decorators/internalRoute.auth'
import { ENABLED_PERMISSION } from '../decorators/permission.auth'
import { PUBLIC_ROUTE } from '../decorators/publicRoute.auth'
import { JwtPayload } from '../dto/jwtPayload.dto'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.isPublicRoute(context)) return true

    if (this.isInternalRoute(context)) {
      this.validateInternalRouteAuthentication(context)
      return true
    }

    if (!this.IsRouteWithAccessNotRequired(context))
      this.validateAccessAndPermission(context)

    return super.canActivate(context)
  }

  private isPublicRoute(context: ExecutionContext): boolean {
    return this.getReflectionData<boolean>(context, PUBLIC_ROUTE)
  }

  private isInternalRoute(context: ExecutionContext): boolean {
    return this.getReflectionData<boolean>(context, INTERNAL_ROUTE)
  }

  private IsRouteWithAccessNotRequired(context: ExecutionContext): boolean {
    return this.getReflectionData<boolean>(context, ACCESS_NOT_REQUIRED)
  }

  private validateInternalRouteAuthentication(context: ExecutionContext): void {
    const {
      headers: { authorization }
    } = context.switchToHttp().getRequest()

    if (!authorization) throw new UnauthorizedException()

    const options = {
      secret: process.env.INTERNAL_JWT_SECRET_KEY,
      verifyOptions: {
        ignoreExpiration: true
      }
    }

    const jwtService = new JwtService(options)

    try {
      jwtService.verify(authorization.replace('Bearer ', ''))
    } catch (error) {
      throw new ForbiddenException()
    }
  }

  private validateAccessAndPermission(context: ExecutionContext): void {
    const requiredAccess = this.getReflectionData<string>(
      context,
      ENABLED_ACCESS
    )

    if (!requiredAccess) return

    const { accesses, ...token } = this.getAuthenticationToken(context)
    const requiredPermission = this.getReflectionData<string>(
      context,
      ENABLED_PERMISSION
    )

    if (
      !accesses ||
      !accesses.split(',').includes(requiredAccess) ||
      (requiredPermission &&
        !JSON.parse(token[requiredAccess])
          .permissions.split(',')
          .includes(requiredPermission))
    )
      throw new ForbiddenException()
  }

  private getReflectionData<T>(context: ExecutionContext, metadataKey: any): T {
    return this.reflector.getAllAndOverride<T>(metadataKey, [
      context.getHandler(),
      context.getClass()
    ])
  }

  private getAuthenticationToken(context: ExecutionContext): JwtPayload {
    const {
      headers: { authorization }
    } = context.switchToHttp().getRequest()

    if (!authorization) {
      throw new UnauthorizedException()
    }

    const options = {
      secret: process.env.JWT_SECRET_KEY,
      verifyOptions: {
        ignoreExpiration: true
      }
    }

    const jwtService = new JwtService(options)

    return jwtService.verify(authorization.replace('Bearer ', ''))
  }
}
