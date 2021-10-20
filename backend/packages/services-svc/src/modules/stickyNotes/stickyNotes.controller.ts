
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger'

import { JwtAuthGuard, BritaniaAuth } from '@britania-crm-com/auth-utils'

import { CreateStickyNoteDto } from './dto/createStickyNote.dto'
import { UpdateStickyNoteDto } from './dto/updateStickyNote.dto'
import { StickyNote } from './entities/stickyNote.entity'
import { StickyNotesService } from './stickyNotes.service'

@ApiTags('StickyNotes')
@Controller('sticky-notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StickyNotesController {
  constructor(private readonly stickyNotesService: StickyNotesService) {}

  @ApiOkResponse({
    description: 'List of stick notes',
    type: StickyNote,
    isArray: true
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false
  })
  @Get()
  async findAll(
    @Query() query,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Array<StickyNote>> {
    return this.stickyNotesService.findAll(query, userId)
  }

  @ApiOkResponse({
    description: 'Stick note registered successfully',
    isArray: true
  })
  @Post()
  async create(
    @Body() data: CreateStickyNoteDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.stickyNotesService.create(data, userId)
  }

  @ApiOkResponse({
    description: 'Sticky note updated successfully',
    isArray: false
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateStickyNoteDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<StickyNote> {
    return this.stickyNotesService.update(id, data, userId)
  }

  @ApiOkResponse({
    description: 'Sticky note deleted successfully',
    isArray: false
  })
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.stickyNotesService.delete(id, userId)
  }
}
