import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  accessId: null,
  permissions: []
}

export default ({ t }) => Yup.object().shape({
  accessId: required({ t, isNotText: true })(Yup.number()).nullable(),
  permissions: required({ t, isNotText: true })(Yup.array())
})
