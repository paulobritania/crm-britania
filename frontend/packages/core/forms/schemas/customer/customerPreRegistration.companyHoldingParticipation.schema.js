import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  name: '',
  city: '',
  state: '',
  branch: '',
  participationPercent: ''
}

export default ({ t }) => Yup.object().shape({
  name: required({ t })(Yup.string()),
  city: Yup.string(),
  state: Yup.string(),
  branch: Yup.string(),
  participationPercent: Yup.string()
})
