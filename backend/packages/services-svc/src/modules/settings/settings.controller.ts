import {
  Controller,
  Get,
  Post,
  Delete,
  Res,
  UseInterceptors,
  Header,
  UploadedFile,
  HttpStatus,
  Inject,
  UseGuards
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'
import { diskStorage } from 'multer'

import {
  BritaniaAuth,
  JwtAuthGuard,
  PublicRoute,
  RequiredAccess,
  RequiredPermission
} from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { UploadFileDto } from './dto/uploadFile.dto'
import { SettingsService } from './settings.service'
import {
  editFilename,
  destinationFolder,
  imageFileFilter
} from './upload.utils'

@ApiTags('Settings')
@ApiBearerAuth()
@Controller('settings')
@UseGuards(JwtAuthGuard)
@RequiredAccess(AccessesEnum.IMAGEM_DO_LOGIN)
export class SettingsController {
  constructor(
    @Inject('SettingsService') private readonly settingsService: SettingsService
  ) {}

  @ApiBody({
    description: 'Upload the image of the login page',
    type: UploadFileDto
  })
  @ApiOkResponse({
    description: 'Image for login page uploaded successfully',
    isArray: true
  })
  @ApiConsumes('multipart/form-data')
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Post('upload-login-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: destinationFolder,
        filename: editFilename
      }),
      fileFilter: imageFileFilter
    })
  )
  async uploadLoginImage(
    @UploadedFile() file: any,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<any> {
    return this.settingsService.uploadLoginImage(file, userId)
  }

  @ApiOkResponse({
    description: 'Image of login page'
  })
  @PublicRoute()
  @Get('login-image')
  async loginImage(@Res() res): Promise<any> {
    const image = await this.settingsService.findLoginBG()

    if (!image) {
      return res.status(HttpStatus.OK).json()
    }

    const { filename, folderpath } = await this.settingsService.fileInfos(
      image.file.path
    )
    return res.sendFile(filename, { root: `./${ folderpath }` })
  }

  @ApiOkResponse({
    description: 'Image of login page deleted successfully',
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Delete('login-image')
  @Header('Content-Type', 'application/json')
  async remove(@BritaniaAuth(['userId']) userId: number): Promise<void> {
    return this.settingsService.deleteLoginImage(userId)
  }
}
