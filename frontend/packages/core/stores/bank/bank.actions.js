import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  saveBank: ['params', 'onSuccess', 'onError'],
  editBank: ['id', 'params', 'onSuccess', 'onError']
})

export { Types as BankTypes, Creators as BankActions }
