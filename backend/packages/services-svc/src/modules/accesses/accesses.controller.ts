
import { Controller, Inject, Get, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'

import { JwtAuthGuard } from '@britania-crm-com/auth-utils'

import { AccessesService } from './accesses.service'
import { Access } from './entities/access.entity'

@ApiTags('Accesses')
@Controller('accesses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccessesController {
  constructor(
    @Inject('AccessesService') private readonly accessesService: AccessesService
  ) {}

  @ApiOkResponse({
    description: 'List of accesses',
    type: Access,
    isArray: true
  })
  @Get()
  findAll(): Promise<Access[]> {
    return this.accessesService.findAll()
  }
}
