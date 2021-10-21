import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  saveRepresentative: ['representative', 'onSuccess', 'onError'],
  concludeRepresentative: ['representative', 'onSuccess', 'onError'],
  updateRepresentative: ['representative', 'id', 'onSuccess', 'onError'],
  uploadFileRepresentative: ['data', 'onSuccess'],
  downloadFileRepresentative: ['url', 'filename', 'onSuccess'],
  deleteFileRepresentative: ['data', 'onSuccess']
})

export {
  Types as RepresentativeTypes,
  Creators as RepresentativeActions
}
