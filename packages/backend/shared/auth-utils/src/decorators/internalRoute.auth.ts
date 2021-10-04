import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const INTERNAL_ROUTE = 'internal_route'
export const InternalRoute = (): CustomDecorator =>
  SetMetadata(INTERNAL_ROUTE, true)
