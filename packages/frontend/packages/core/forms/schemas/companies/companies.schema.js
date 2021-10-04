import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  name: '',
  cnpj: '',
  bankCode: '',
  agency: '',
  account: '',
  identifier: '',
  message: ''
}

export default ({ t }) => Yup.object().shape({
  name: flow(
    maxLength({
      t,
      length: 150,
      type: t('characters'),
      field: t('company')
    }),
    required({ t })
  )(Yup.string()),
  cnpj: flow(
    cpfCnpj({ t, mode: 'cnpj' }),
    required({ t })
  )(Yup.string()),
  bankCode: required({ t })(Yup.string()),
  agency: required({ t })(Yup.string()),
  account: required({ t })(Yup.string()),
  identifier: maxLength({
    t,
    length: 8,
    type: t('characters')
  })(Yup.string()),
  message: maxLength({
    t,
    length: 500,
    type: t('characters')
  })(Yup.string())
})
