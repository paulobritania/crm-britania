import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions(
  {
    getAllProfiles: [],
    setAllProfilesSuccess: ['profiles'],
    setSelectedAccess: ['list'],
    getAccess: [],
    setAllAccess: ['item'],
    createProfile: ['params', 'onSuccess'],
    editProfile: ['id', 'params', 'onSuccess'],
    patchProfileStatus: ['id', 'onSuccess'],
    deleteProfile: ['id', 'onSuccess']
  })

export {
  Types as ProfilesTypes,
  Creators as ProfilesActions
}
