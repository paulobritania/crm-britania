import * as Yup from 'yup'

import flow from 'lodash/flow'

import required from '@britania-crm/forms/validators/required.validator'
import year from '@britania-crm/forms/validators/year.validator'

export const INITIAL_VALUES = {
  month: '',
  year: '',
  value: ''
}

export default ({ t }) => Yup.object().shape({
  month: required({ t, isNotText: true })(Yup.string()),
  year: flow(
    year({ t }),
    required({ t })
  )(Yup.string()),
  value: required({ t })(Yup.string())
})
