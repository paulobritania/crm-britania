import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  login: ['login', 'password', 'rememberUser'],
  loginSuccess: ['accessToken', 'expirationDate', 'user'],
  authError: ['error'],
  setAuthStatus: ['status'],
  logout: []
})

export {
  Types as AuthTypes,
  Creators as AuthActions
}
