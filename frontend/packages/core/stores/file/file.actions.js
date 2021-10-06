import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  deleteFile: ['id', 'onSuccess'],
  uploadImage: ['data', 'onSuccess'],
  download: ['url', 'name', 'onSuccess']
})

export {
  Types as FileTypes,
  Creators as FileActions
}
