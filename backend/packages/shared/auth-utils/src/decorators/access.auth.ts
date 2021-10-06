import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const ENABLED_ACCESS = 'enabled_access'
export const RequiredAccess = (access: string): CustomDecorator =>
  SetMetadata(ENABLED_ACCESS, access)
