import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = { reasonDeactivation: '' }

export default ({ t }) => Yup.object().shape({
  reasonDeactivation: flow(
    maxLength({
      t,
      field: t('reason'),
      length: 140
    }),
    required({ t })
  )(Yup.string())
})
