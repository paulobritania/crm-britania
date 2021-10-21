import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@britania-crm-com/auth-utils'

import { HierarchyLevelsDto } from './dtos/hierarchyLevels.dto'
import { HierarchyService } from './hierarchy.service'

@ApiTags('Hierarchy')
@Controller('hierarchy')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HierarchyController {
  constructor(private readonly hierarchyService: HierarchyService) {}

  @ApiOkResponse({
    description: 'List of hierarchy levels',
    type: HierarchyLevelsDto,
    isArray: true
  })
  @Get('levels')
  getHierarchyLevels(): Promise<HierarchyLevelsDto[]> {
    return this.hierarchyService.getHierarchyLevels()
  }
}
