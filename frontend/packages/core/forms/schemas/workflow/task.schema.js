import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import number from '@britania-crm/forms/validators/number.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  title: '',
  systemProfile: '',
  user: {},
  userAlternate: {},
  slaTime: ''
}

export default ({ t }) => Yup.object().shape({
  title: required({ t })(Yup.string()),
  systemProfile: required({ t })(Yup.string()),
  user: Yup.object().nullable(),
  userAlternate: Yup.object().nullable(),
  slaTime: flow(
    number({ t }),
    required({ t })
  )(Yup.string())
})
