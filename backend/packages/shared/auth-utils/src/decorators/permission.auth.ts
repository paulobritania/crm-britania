import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const ENABLED_PERMISSION = 'enabled_permission'
export const RequiredPermission = (permission: string): CustomDecorator =>
  SetMetadata(ENABLED_PERMISSION, permission)
