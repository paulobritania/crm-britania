import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Inject,
  Param,
  UseGuards
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'
import { diskStorage } from 'multer'

import { AccessNotRequired, BritaniaAuth, JwtAuthGuard, PublicRoute, RequiredAccess, RequiredPermission } from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { UploadFileDto } from '../settings/dto/uploadFile.dto'
import { editFilename, destinationFolder } from '../settings/upload.utils'
import { FilesService } from './files.service'

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@RequiredAccess(AccessesEnum.IMAGEM_DO_LOGIN)
export class FilesController {
  constructor(
    @Inject('FilesService') private readonly filesService: FilesService
  ) {}

  @ApiBody({
    description: 'Upload an file',
    type: UploadFileDto
  })
  @ApiOkResponse({
    description: 'File uploaded successfully',
    isArray: true
  })
  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @RequiredPermission(PermissionsEnum.EDITAR)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: destinationFolder,
        filename: editFilename
      })
    })
  )
  async uploadLoginImage(
    @UploadedFile() file: any,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<any> {
    return this.filesService.upload(file, userId)
  }

  @ApiBody({
    description: 'Upload many files'
    // type: UploadFileDto
  })
  @ApiOkResponse({
    description: 'File uploaded successfully',
    isArray: true
  })
  @ApiConsumes('multipart/form-data')
  @AccessNotRequired()
  @Post('uploadMany')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: destinationFolder,
        filename: editFilename
      })
    })
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<any> {
    return this.filesService.uploadMany(files, userId)
  }

  @ApiOkResponse({
    description: 'File loaded successfully'
  })
  @Get(':path')
  @PublicRoute()
  async loginImage(@Param('path') file: string, @Res() res): Promise<any> {
    const exists = await this.filesService.verifyFolder(file)
    return exists ? res.sendFile(file, { root: './' }) : res.json(null)
  }

  @ApiOkResponse({
    description: 'Image of login page deleted successfully',
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.filesService.delete(id, userId)
  }
}
