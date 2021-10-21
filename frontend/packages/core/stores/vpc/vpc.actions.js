import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  saveVpc: ['vpc', 'startWorkflow', 'onSuccess', 'onError'],
  editVpc: ['id', 'vpc', 'startWorkflow', 'onSuccess', 'onError'],
  startWorkflowVpc: ['id'],
  uploadFileVpc: ['data', 'onSuccess'],
  downloadFileVpc: ['url', 'filename', 'onSuccess'],
  deleteFileVpc: ['data', 'onSuccess']
})

export {
  Types as VpcTypes,
  Creators as VpcActions
}
