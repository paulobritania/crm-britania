import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  name: '',
  active: true,
  permissions: [],
  access: [],
  micros: [],
  users: [],
  exceptions: []
}

export default ({ t }) => Yup.object().shape({
  name: required({ t })(Yup.string()),
  active: Yup.bool(),
  permissions: Yup.array(),
  access: required({ t, isNotText: true })(Yup.array()),
  micros: Yup.array(),
  users: Yup.array(),
  exceptions: Yup.array()
})
