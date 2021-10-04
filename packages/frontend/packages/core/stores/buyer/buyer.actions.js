import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  saveBuyer: ['params', 'onSuccess', 'onError'],
  editBuyer: ['id', 'params', 'onSuccess', 'onError']
})

export {
  Types as BuyerTypes,
  Creators as BuyerActions
}
