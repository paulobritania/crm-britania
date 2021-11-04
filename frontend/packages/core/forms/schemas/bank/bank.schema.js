import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  companyCode: 0,
  bankCode: 0,
  agency: '',
  account: '',
  note: ''
}

export default ({ t }) => {
  return Yup.object().shape({
    companyCode: required({ t })(Yup.number()),
    bankCode: required({ t })(Yup.number()),
    agency: maxLength({
      t,
      length: 10,
      type: t('characters', { howMany: 1 }),
      field: t('agency', { howMany: 1 })
    })(Yup.string()),
    account: maxLength({
      t,
      length: 10,
      type: t('characters', { howMany: 1 }),
      field: t('account', { howMany: 1 })
    })(Yup.string()),
    note: maxLength({
      t,
      length: 10,
      type: t('characters', { howMany: 1 }),
      field: t('note', { howMany: 1 })
    })(Yup.string())
  })
}
