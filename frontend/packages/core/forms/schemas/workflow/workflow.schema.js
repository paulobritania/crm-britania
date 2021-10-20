import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import date from '@britania-crm/forms/validators/date.validator'
import dateRange from '@britania-crm/forms/validators/dateRange.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  title: '',
  typeId: '',
  description: '',
  active: false,
  version: '',
  lastUpdateLogin: '',
  lastUpdateDate: '',
  period: {
    from: '',
    to: ''
  }
}

export default ({ t, minFrom }) => Yup.object().shape({
  title: flow(
    maxLength({ t, length: 80 }),
    required({ t })
  )(Yup.string()),
  typeId: required({ t })(Yup.string()),
  description: flow(
    maxLength({ t, length: 200 }),
    required({ t })
  )(Yup.string()),
  active: Yup.bool(),
  version: (Yup.string()),
  lastUpdateLogin: Yup.string(),
  lastUpdateDate: date({ t })(Yup.string()),
  period: flow(
    dateRange({ t, minFrom }),
    required({
      t, isNotText: true, isDateRange: true
    })
  )(Yup.object())
})
