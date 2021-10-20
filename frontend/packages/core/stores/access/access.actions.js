import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  getAllAccesses: [],
  setAllAccesses: ['accesses']
})

export {
  Types as AccessTypes,
  Creators as AccessActions
}
