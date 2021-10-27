import { ApiProperty } from '@nestjs/swagger'

import { FileTypeDto } from './fileType.dto'

export class UploadFileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: FileTypeDto
}
