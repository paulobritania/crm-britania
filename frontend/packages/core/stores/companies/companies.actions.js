import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({
  saveCompany: ['params', 'onSuccess', 'onError'],
  updateCompany: ['id', 'params', 'onSuccess', 'onError'],
  saveCompanyBank: ['params', 'onSuccess', 'onError'],
  editCompanyBank: ['id', 'params', 'onSuccess', 'onError']
})

export { Types as CompanyTypes, Creators as CompanyActions }
