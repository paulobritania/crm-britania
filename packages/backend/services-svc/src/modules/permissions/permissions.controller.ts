
import { Controller, Inject, Get, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'

import { JwtAuthGuard, RequiredAccess } from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { Permission } from './entities/permission.entity'
import { PermissionsService } from './permissions.service'

@ApiTags('Permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard)
@RequiredAccess(AccessesEnum.CONTROLE_DE_PERFIL)
@ApiBearerAuth()
export class PermissionsController {
  constructor(
    @Inject('PermissionsService') private readonly permissionsService: PermissionsService
  ) {}

  @ApiOkResponse({
    description: 'List of permissions',
    type: Permission,
    isArray: true
  })
  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll()
  }

}
