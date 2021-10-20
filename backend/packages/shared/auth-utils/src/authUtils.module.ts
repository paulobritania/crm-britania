import { Module } from '@nestjs/common'

import { JwtAuthGuard } from './auth/jwt.auth.guard'
import { JwtStrategy } from './auth/jwt.strategy'
import { RequiredAccess } from './decorators/access.auth'
import { AccessNotRequired } from './decorators/accessNotRequired.auth'
import { BritaniaAuth } from './decorators/britania.auth'
import { InternalRoute } from './decorators/internalRoute.auth'
import { RequiredPermission } from './decorators/permission.auth'
import { PublicRoute } from './decorators/publicRoute.auth'

@Module({
  exports: [
    BritaniaAuth,
    JwtStrategy,
    JwtAuthGuard,
    RequiredPermission,
    RequiredAccess,
    PublicRoute,
    InternalRoute,
    AccessNotRequired
  ]
})
export class AuthUtilsModule {}
