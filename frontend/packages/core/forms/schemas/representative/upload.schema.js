import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import file from '@britania-crm/forms/validators/file.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  file: '',
  observation: '',
  name: '',
  path: ''
}

export default ({ t }) => Yup.object().shape({
  file: flow(
    file({ t }),
    required({ t, isNotText: true })
  )(Yup.mixed()),
  name: required({ t })(Yup.string()),
  observation: required({ t })(Yup.string()),
  path: Yup.string()
})
