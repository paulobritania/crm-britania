import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import phone from '@britania-crm/forms/validators/phone.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  code: {},
  name: '',
  agency: '',
  account: '',
  phone: ''
}

export default ({ t }) => Yup.object().shape({
  code: Yup.object(),
  name: Yup.string(), // required({ t })(Yup.string()),
  agency: flow(
    maxLength({
      t,
      length: 4,
      type: t('characters', { howMany: 2 }),
      field: t('agency', { howMany: 1 })
    }),
    required({ t })
  )(Yup.string()),
  account: Yup.string(), // required({ t })(Yup.string()),
  phone: flow(
    phone({ t })
    // required({ t })
  )(Yup.string())
})
