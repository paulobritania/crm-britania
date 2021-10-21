import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Get,
  Param,
  Put,
  Delete,
  Query
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNoContentResponse
} from '@nestjs/swagger'
import { diskStorage } from 'multer'

import { AccessNotRequired, BritaniaAuth, JwtAuthGuard, RequiredAccess, RequiredPermission } from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { UploadFileDto } from '../settings/dto/uploadFile.dto'
import {
  editFilename,
  destinationFolder,
  preRegisterFilter
} from '../settings/upload.utils'
import { ConfigurationsService } from './configurations.service'
import { BodyCreateDocumentDto } from './dtos/bodyCreateDocument.dto'
import { BodyUpdateDocumentDto } from './dtos/bodyUpdateDocument.dto'
import { FindAllDocumentsDto } from './dtos/findAllDocuments.dto'
import { Document } from './entities/document.entity'

@ApiTags('Configurations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@RequiredAccess(AccessesEnum.ADMINISTRATIVO)
@Controller('configurations')
export class ConfigurationsController {
  constructor(
    @Inject('ConfigurationsService')
    private readonly configurationsService: ConfigurationsService
  ) {}

  @ApiOkResponse({
    description: 'List of documents'
  })
  @Get('documents')
  async findAll(
    @Query() query: FindAllDocumentsDto
  ): Promise<Document[]> {
    return this.configurationsService.findAll(query)
  }

  @ApiOkResponse({
    description: 'Document image'
  })
  @Get('documents/:alias')
  @AccessNotRequired()
  async getDocument(@Param('alias') alias: string): Promise<Document> {
    return this.configurationsService.getDocument(alias)
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: destinationFolder,
        filename: editFilename
      }),
      fileFilter: preRegisterFilter
    })
  )
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @Post('documents')
  async createDocument(
    @UploadedFile() file: UploadFileDto,
    @Body() data: BodyCreateDocumentDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Document> {
    const document: any = { ...data, file }
    return this.configurationsService.createDocument(document, userId)
  }

  @ApiNoContentResponse()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: destinationFolder,
        filename: editFilename
      }),
      fileFilter: preRegisterFilter
    })
  )
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Put('documents')
  async updateDocument(
    @Body() data: BodyUpdateDocumentDto,
    @UploadedFile() file: UploadFileDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    const document: any = { ...data, file }
    return this.configurationsService.updateDocument(document, userId)
  }

  @ApiOkResponse({
    description: 'Document deleted successfully',
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EXCLUIR)
  @Delete('documents/:id')
  async delete(
    @Param('id') id:number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.configurationsService.delete(id, userId)
  }

}
