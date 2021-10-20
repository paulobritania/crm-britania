import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  value: '',
  description: '',
  localization: ''
}

export default ({ t }) => Yup.object().shape({
  value: (Yup.string()),
  description: flow(
    maxLength({
      t,
      field: t('description'),
      type: t('characters', { howMany: 1 }),
      length: 30
    }),
    required({ t }))(Yup.string()),
  localization: flow(
    maxLength({
      t,
      field: t('material good relation localization'),
      type: t('characters', { howMany: 1 }),
      length: 15
    }))(Yup.string())
})
