import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  updateCustomer: ['params', 'id', 'onSuccess', 'onError'],
  changeRankings: ['matrixCode', 'params', 'onSuccess'],
  downloadFileCustomer: ['url', 'filename'],

  saveCustomerPreRegistry: ['client', 'oldClient', 'onSuccess', 'onError'],
  saveCustomerPreRegistrySuccess: [],
  finishCustomerPreRegistry: ['client', 'oldClient', 'onSuccess', 'onError']
})

export {
  Types as CustomerTypes,
  Creators as CustomerActions
}
