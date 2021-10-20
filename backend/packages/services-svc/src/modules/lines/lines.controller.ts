import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { BritaniaAuth, JwtAuthGuard } from '@britania-crm-com/auth-utils'

import { FamilyDto } from './dtos/families/family.dto'
import { FamilyQueryDto } from './dtos/families/familyQuery.dto'
import { LineDto } from './dtos/lines/lines.dto'
import { FindAllLinesQueryDto } from './dtos/lines/linesQuery.dto'
import { MasterLineDto } from './dtos/masterLines/masterLine.dto'
import { LinesService } from './lines.service'

@ApiTags('Lines')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @ApiOkResponse({
    description: 'List of lines',
    isArray: true
  })
  @Get()
  async findAll(
    @Query() query: FindAllLinesQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<LineDto[]> {
    return this.linesService.findAll(query, tokenBritania)
  }

  @ApiOkResponse({
    description: 'List of master lines',
    isArray: true
  })
  @Get('masters')
  async findAllMasterLines(
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<MasterLineDto[]> {
    return this.linesService.findAllMasterLines(tokenBritania)
  }

  @ApiOkResponse({
    description: 'List of families',
    isArray: true,
    type: FamilyDto
  })
  @Get('families')
  async findAllFamilies(
    @Query() query: FamilyQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<FamilyDto[]> {
    return this.linesService.findAllFamilies(query, tokenBritania)
  }
}
