import { createReducer } from 'reduxsauce'

import { MessageTypes } from './message.actions'

const INITIAL_STATE = {
  allMessage: [],
  message: {},
  profiles: [],
  allFilterMessage: [],
  loading: false
}

const setAllMessageSuccess = (state = INITIAL_STATE, { messages }) => ({
  ...state,
  allMessage: messages
})

const setOneMessageSuccess = (state = INITIAL_STATE, { message }) => ({
  ...state,
  message
})

const cleanMessage = (state = INITIAL_STATE) => ({
  ...state,
  message: {},
  profiles: []
})

const setProfilesSelected = (state = INITIAL_STATE, { profile }) => ({
  ...state,
  profiles: profile
})

const setAllFilterMessageSuccess = (state = INITIAL_STATE, { messages }) => ({
  ...state,
  allFilterMessage: messages
})

const setLoading = (state = INITIAL_STATE, { loading }) => ({
  ...state,
  loading
})

export default createReducer(INITIAL_STATE, {
  [MessageTypes.SET_ALL_MESSAGE_SUCCESS]: setAllMessageSuccess,
  [MessageTypes.SET_ONE_MESSAGE_SUCCESS]: setOneMessageSuccess,
  [MessageTypes.CLEAN_MESSAGE]: cleanMessage,
  [MessageTypes.SET_PROFILES_SELECTED]: setProfilesSelected,
  [MessageTypes.SET_ALL_FILTER_MESSAGE_SUCCESS]: setAllFilterMessageSuccess,
  [MessageTypes.SET_LOADING]: setLoading
})
