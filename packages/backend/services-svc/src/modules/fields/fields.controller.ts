
import { Controller, Inject, Get, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'

import { JwtAuthGuard } from '@britania-crm-com/auth-utils'

import { Field } from './entities/field.entity'
import { FieldsService } from './fields.service'

@ApiTags('Fields')
@Controller('fields')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FieldsController {
  constructor(
    @Inject('FieldsService') private readonly fieldsService: FieldsService
  ) {}

  @ApiOkResponse({
    description: 'List of access fields',
    type: Field,
    isArray: true
  })
  @Get(':accessId')
  findAll(@Param('accessId') accessId: number): Promise<Field[]> {
    return this.fieldsService.findByAccessId(accessId)
  }

}
