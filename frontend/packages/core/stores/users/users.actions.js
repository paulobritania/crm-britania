import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  saveUser: ['user', 'onSuccess', 'onError'],
  removeUser: ['userId', 'onSuccess', 'onError'],
  attachProfiles: ['userId', 'profilesId', 'onSuccess', 'onError'],
  usersError: ['error']
})

export {
  Types as UsersTypes,
  Creators as UsersActions
}
