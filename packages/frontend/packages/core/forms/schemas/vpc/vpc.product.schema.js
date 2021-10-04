import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  code: '',
  quantity: '',
  description: ''
}

export default ({ t }) => Yup.object().shape({
  code: required({ t })(Yup.string()),
  quantity: Yup.lazy((value) => typeof value === 'number' ? Yup.number() : Yup.string()),
  description: Yup.string()
})
