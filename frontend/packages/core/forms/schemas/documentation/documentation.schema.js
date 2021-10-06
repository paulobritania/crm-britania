import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import file from '@britania-crm/forms/validators/file.validator'
import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  file: '',
  title: '',
  observation: ''
}

export default ({ t }) => Yup.object().shape({
  title: flow(
    maxLength({
      t,
      field: t('title'),
      type: t('characters', { howMany: 1 }),
      length: 70
    }),
    required({ t })
  )(Yup.string()),
  file: file({ t })(Yup.mixed()),
  observation: Yup.string()
})
