import {
  Body,
  Controller,
  Get,
  Delete,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UseGuards
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FilesInterceptor } from '@nestjs/platform-express'
import {
  ApiOkResponse,
  ApiConsumes,
  ApiTags,
  ApiBearerAuth
} from '@nestjs/swagger'
import { diskStorage } from 'multer'

import { AccessNotRequired, BritaniaAuth, JwtAuthGuard, RequiredAccess, RequiredPermission } from '@britania-crm-com/auth-utils'

import { PaginationQueryDto } from '../../utils/dto/paginationQuery.dto'
import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { formatPaginationQuery } from '../../utils/formatters/queryFormatters'
import {
  editFilename,
  destinationFolder,
  messageBoardFileFilter
} from '../settings/upload.utils'
import { CreateMessageDto } from './dto/createMessage.dto'
import { MessageBoardsWithFilterRequestDto } from './dto/messageBoardsWithFilterRequestDto.dto'
import { UpdateMessageDto } from './dto/updateMessage.dto'
import { MessageBoard } from './entities/messageBoard.entity'
import { MessageBoardsService } from './messageBoards.service'

@ApiTags('Message Boards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('message-boards')
@UseGuards(JwtAuthGuard)
@RequiredAccess(AccessesEnum.MURAL_DE_RECADOS)
@ApiBearerAuth()
export class MessageBoardsController {
  constructor(
    @Inject('MessageBoardsService')
    private readonly messageBoardsService: MessageBoardsService,
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy
  ) {}

  @ApiOkResponse({
    description: 'List of all messages',
    type: MessageBoard,
    isArray: true
  })
  @Get()
  @AccessNotRequired()
  findAll(
    @Query() query: PaginationQueryDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Array<MessageBoard>> {
    const formattedQuery = formatPaginationQuery(query)

    return this.messageBoardsService.findAll(formattedQuery, userId)
  }

  @ApiOkResponse({
    description: 'List of messages filtered',
    type: MessageBoard,
    isArray: true
  })
  @AccessNotRequired()
  @Get('/filter')
  search(
    @Query() query: MessageBoardsWithFilterRequestDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Array<MessageBoard>> {
    return this.messageBoardsService.search(query, userId)
  }

  @ApiOkResponse({
    description: 'Get a message by ID',
    type: MessageBoard,
    isArray: false
  })
  @AccessNotRequired()
  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<any> {
    return this.messageBoardsService.findByPk(id, userId)
  }

  @ApiOkResponse({
    description: 'Message registered successfully',
    type: CreateMessageDto,
    isArray: false
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: destinationFolder,
        filename: editFilename
      }),
      fileFilter: messageBoardFileFilter
    })
  )
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @Post()
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: CreateMessageDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    const message = { ...data, files }

    return this.messageBoardsService.create(message, userId)
  }

  @ApiOkResponse({
    description: 'Occurrence updated successfully',
    type: UpdateMessageDto,
    isArray: false
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: destinationFolder,
        filename: editFilename
      }),
      fileFilter: messageBoardFileFilter
    })
  )
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: UpdateMessageDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<MessageBoard> {
    const message = { ...data, files }
    return this.messageBoardsService.update(id, message, userId)
  }

  @ApiOkResponse({
    description: 'Message deleted successfully',
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EXCLUIR)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.messageBoardsService.delete(id, userId)
  }

  @ApiOkResponse({
    description: 'Message deleted successfully',
    isArray: false
  })
  @Delete(':id/file/:fileId')
  @RequiredPermission(PermissionsEnum.EXCLUIR)
  async deleteAttachment(
    @Param('id') id: number,
    @Param('fileId') fileId: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.messageBoardsService.deleteAttachment(id, fileId, userId)
  }
}
