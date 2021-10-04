import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const PUBLIC_ROUTE = 'public_route'
export const PublicRoute = (): CustomDecorator =>
  SetMetadata(PUBLIC_ROUTE, true)
