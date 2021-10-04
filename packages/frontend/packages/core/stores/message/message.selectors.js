import moment from 'moment'

import filter from 'lodash/filter'
import find from 'lodash/find'
import map from 'lodash/map'

export const getAllMessage = (state) => {
  const profile = map(state.message.allMessage, (item) => {
    const profile = map(item.messageProfile, (option) => option?.profile[0]?.name)
    return { ...item, messageProfile: profile.join(' - ') }
  })
  return profile
}
export const selectFilteredMessages = (state) => (filter(state?.message?.allMessage, ({ homeScreen }) => !!homeScreen))
export const getOneMessage = (state) => state.message.message
export const getProfileSelected = (state) => state.message.profiles
export const getLastMessage = (state) => find(state?.message?.allMessage, (item) => item.homeScreen === '1' && moment().isSameOrBefore(item.expirationDate))
export const getLastFiveMessage = (state) => state.message?.allMessage?.slice(Math.max(state.message?.allMessage?.length - 5, 0))
export const getLoading = (state) => state.message?.loading
export const getAllFilterMessage = (state) => state.message?.allFilterMessage?.slice(Math.max(state.message?.allMessage?.length - 5, 0)).reverse()
