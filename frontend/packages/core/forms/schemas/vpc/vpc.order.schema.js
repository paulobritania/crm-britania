import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  requestNumber: '',
  establishmentCode: '',
  establishmentName: '',
  value: ''
}

export default ({ t }) => Yup.object().shape({
  requestNumber: Yup.string(),
  establishmentCode: required({ t })(Yup.string()),
  establishmentName: Yup.string(),
  value: Yup.string()
})
