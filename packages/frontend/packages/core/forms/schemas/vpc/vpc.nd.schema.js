import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import date from '@britania-crm/forms/validators/date.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  number: '',
  issuerCompany: {},
  issuerCompanyCode: '',
  issuerCompanyName: '',
  issueDate: '',
  dueDate: '',
  value: '',
  company: '',
  observation: '',
  active: true
}

export default ({ t }) => Yup.object().shape({
  number: required({ t })(Yup.string()),
  issuerCompany: required({ t, isNotText: true })(Yup.object()),
  issuerCompanyCode: required({ t })(Yup.string()),
  issuerCompanyName: Yup.string(),
  issueDate: flow(
    date({ t }),
    required({ t })
  )(Yup.string()),
  dueDate: flow(
    date({ t }),
    required({ t })
  )(Yup.string()),
  value: required({ t })(Yup.string()),
  company: required({ t })(Yup.string()),
  observation: flow(
    maxLength({
      t,
      length: 500,
      type: t('characters', { howMany: 1 }),
      field: t('observation', { howMany: 1 })
    }),
    required({ t })
  )(Yup.string())
})
