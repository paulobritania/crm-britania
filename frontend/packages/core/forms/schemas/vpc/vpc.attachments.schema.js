import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import file from '@britania-crm/forms/validators/file.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  file: '',
  description: '',
  path: ''
}

export default ({ t }) => Yup.object().shape({
  file: flow(
    file({ t }),
    required({ t, isNotText: true })
  )(Yup.mixed()),
  description: flow(
    maxLength({
      t,
      field: t('description'),
      length: 70
    }),
    required({ t })
  )(Yup.string()),
  path: Yup.string()
})
