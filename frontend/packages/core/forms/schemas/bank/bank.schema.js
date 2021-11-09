import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import number from '@britania-crm/forms/validators/number.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  companyId: null,
  identifier: 0,
  bankCode: '',
  bank: null,
  agency: '',
  account: '',
  note: '',
  cnpj: ''
}

export default (t) => {
  return Yup.object().shape({
    identifier: Yup.string().min(2, t('company is required')),
    companyId: Yup.number().nullable(),
    bankCode: Yup.string(),
    bank: Yup.object().required(t('bank is required')).nullable(),
    agency: flow(
      maxLength({
        t,
        length: 4,
        type: t('digits'),
        field: t('agency', { howMany: 1 })
      }),
      required({ t }),
      number({ t })
    )(Yup.string()),
    account: flow(
      maxLength({
        t,
        length: 10,
        type: t('digits'),
        field: t('account', { howMany: 1 })
      }),
      required({ t })
    )(Yup.string()),
    note: flow(
      maxLength({
        t,
        length: 240,
        type: t('digits'),
        field: t('observation', { howMany: 2 })
      })
    )(Yup.string())
  })
}
