import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  establishment: {},
  childLine: {},
  commission: ''
}

export default ({ t }) => Yup.object().shape({
  establishment: required({ t, isNotText: true })(Yup.object()),
  childLine: required({ t, isNotText: true })(Yup.object()),
  commission: required({ t })(Yup.string())
})
