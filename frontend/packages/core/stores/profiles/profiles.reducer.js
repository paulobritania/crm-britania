import { createReducer } from 'reduxsauce'

import { ProfilesTypes } from './profiles.actions'

const INITIAL_STATE = {
  selectedAccess: [],
  profiles: [],
  access: [],
  profile: []
}

const setAllAccess = (state = INITIAL_STATE, { item }) => ({
  ...state,
  access: item
})

const setSelectedAccess = (state = INITIAL_STATE, { list }) => ({
  ...state,
  selectedAccess: list
})

const setAllProfilesSuccess = (state = INITIAL_STATE, { profiles }) => ({
  ...state,
  profiles
})

export default createReducer(INITIAL_STATE, {
  [ProfilesTypes.SET_SELECTED_ACCESS]: setSelectedAccess,
  [ProfilesTypes.SET_ALL_PROFILES_SUCCESS]: setAllProfilesSuccess,
  [ProfilesTypes.SET_ALL_ACCESS]: setAllAccess
})
