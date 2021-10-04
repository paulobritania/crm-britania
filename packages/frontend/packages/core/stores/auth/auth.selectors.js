import indexOf from 'lodash/indexOf'
import mapValues from 'lodash/mapValues'
import reduce from 'lodash/reduce'

import { USER_ACTIONS } from '@britania-crm/constants/auth.constants'

export const selectIsAuthenticated = (state) => !!state.auth.accessToken

export const selectAccessToken = (state) => state.auth.accessToken

export const selectAuthStatus = (state) => state.auth.status

export const selectAuthError = (state) => state.auth.error

export const selectHasAccessToMessageBoard = (state) => state.auth.hasAccessToMessageBoard

export const selectRememberUser = (state) => state.auth.rememberUser

export const selectUserIdFromToken = (state) => {
  const { userId } = state.auth.jwtContent
  return userId
}

export const selectAuthUserAccesses = (state) => (state.auth.jwtContent?.accesses || '').split(',')

export const selectAuthUserPermissions = (state) => {
  const userAccesses = selectAuthUserAccesses(state)

  return reduce(userAccesses, (acc, access) => {
    const accessByJWT = state.auth.jwtContent?.[access]
    if (accessByJWT) {
      try {
        const accessJson = JSON.parse(accessByJWT)
        const jsonSplitted = mapValues(accessJson, (field) => field.split(','))
        return {
          ...acc,
          [access]: {
            ...jsonSplitted,
            permissions: mapValues(USER_ACTIONS, (action) => indexOf(jsonSplitted?.permissions, action) > -1)
          }
        }
      } catch (e) {
        return acc
      }
    }
    return acc
  }, {})
}

export const selectUser = (state) => state.auth.user

export const selectUserRepresentative = (state) => state.auth.user.representativeCodes
