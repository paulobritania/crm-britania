import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  saveFan: ['fan', 'onSuccess', 'onError'],
  concludeFan: ['id', 'onSuccess', 'onError'],
  updateFan: ['id', 'params', 'onSuccess', 'onError'],
  uploadFileFan: ['data', 'idFan', 'onSuccess'],
  downloadFileFan: ['url', 'filename'],
  deleteFileFan: ['id', 'onSuccess']
})

export {
  Types as FanTypes,
  Creators as FanActions
}
