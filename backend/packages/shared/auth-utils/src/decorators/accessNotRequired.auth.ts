import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const ACCESS_NOT_REQUIRED = 'access_not_required'
export const AccessNotRequired = (): CustomDecorator =>
  SetMetadata(ACCESS_NOT_REQUIRED, true)
