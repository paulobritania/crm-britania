import * as Yup from 'yup'

import file from '@britania-crm/forms/validators/file.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  file: '',
  description: '',
  path: '',
  fileId: '',
  filename: ''
}

export default ({ t }) => Yup.object().shape({
  file: file({ t })(Yup.mixed()),
  description: required({ t })(Yup.string()),
  filename: required({ t })(Yup.string()),
  path: Yup.string(),
  fileId: Yup.string()
})
