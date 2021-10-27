/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BadRequestException } from '@nestjs/common'
import { existsSync, mkdirSync } from 'fs'

/**
 * Define o nome do arquivo a ser salvo
 * @param req any
 * @param file any
 * @param callback any
 */
export const editFilename = (req: any, file: any, callback: any) => {
  callback(null, file.originalname)
}

/**
 * Gera um nome de pasta aleatório e define onde será salvo o arquivo do upload
 * @param req any
 * @param file any
 * @param callback any
 */
export const destinationFolder = async (req: any, file: any, callback: any) => {
  const randomName = Array(6)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')

  const uploadPath = `${ process.env.UPLOAD_FOLDER }/${ randomName }`
  let folderPath = ''


  for (const folder of uploadPath.split('/')) {
    folderPath += `${ folder  }/`

    if (!existsSync(folderPath)) {
      await mkdirSync(folderPath)
    }
  }

  callback(null, uploadPath)
}

/**
 * Define tipos de arquivo que são permitidos
 * @param req any
 * @param file any
 * @param callback any
 */
export const imageFileFilter = (req: any, file: any, callback: any) => {
  const filename = file.originalname.toLowerCase()
  if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false)
  }
  return callback(null, true)
}

/**
 * Define tipos de arquivo que são permitidos no Mural de recados
 * @param req any
 * @param file any
 * @param callback any
 */
export const messageBoardFileFilter = (req: any, file: any, callback: any) => {
  const filename = file.originalname.toLowerCase()
  if (!filename.match(/\.(xls|xlsx|jpg|pdf)$/)) {
    return callback(new BadRequestException('Only jpg, pdf or excel types are allowed!'), false)
  }
  return callback(null, true)
}

/**
 * Define tipos de arquivo que são permitidos no Pré-Cadastro
 * @param req any
 * @param file any
 * @param callback any
 */
 export const preRegisterFilter = (req: any, file: any, callback: any) => {
  const filename = file.originalname.toLowerCase()
  if (!filename.match(/\.(jpg|pdf)$/)) {
    return callback(new BadRequestException('Only jpg or pdf types are allowed!'), false)
  }
  return callback(null, true)
}
