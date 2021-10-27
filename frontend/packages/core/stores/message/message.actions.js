import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  getAllMessage: [],
  setAllMessageSuccess: ['messages'],
  getOneMessage: ['id'],
  setOneMessageSuccess: ['message'],
  createMessage: ['params', 'onSuccess', 'onError'],
  updateMessage: ['id', 'params', 'onSuccess', 'onError'],
  deleteMessage: ['id', 'onSuccess', 'onError'],
  deleteMessageAttachment: ['id', 'files', 'onSuccess'],
  cleanMessage: [],
  getFilteredMessages: ['filters'],
  setProfilesSelected: ['profile'],
  setAllFilterMessageSuccess: ['messages'],
  setLoading: ['loading']
})

export {
  Types as MessageTypes,
  Creators as MessageActions
}
