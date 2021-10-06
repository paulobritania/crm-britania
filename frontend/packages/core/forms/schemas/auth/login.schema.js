import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import password from '@britania-crm/forms/validators/password.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  login: '',
  password: ''
}

export default ({ t }) => Yup.object().shape({
  login: required({ t })(Yup.string()),
  password: flow(
    password({ t }),
    required({ t })
  )(Yup.string())
})
