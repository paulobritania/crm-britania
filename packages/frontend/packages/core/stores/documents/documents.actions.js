import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  createDocument: ['params', 'onSuccess', 'onError'],
  updateDocument: ['params', 'onSuccess', 'onError'],
  deleteDocument: ['id', 'onSuccess']
})

export {
  Types as DocumentsTypes,
  Creators as DocumentsActions
}
