import * as Yup from 'yup'

import { flow } from 'lodash'

import required from '@britania-crm/forms/validators/required.validator'

import maxLength from '../../validators/maxLength.validator'

export const INITIAL_VALUES = {
  rankingId: '',
  justification: ''
}

export default ({ t }) => Yup.object().shape({
  rankingId: required({ t })(Yup.string()),
  justification: flow(
    maxLength({
      t,
      length: 100,
      type: t('characters'),
      field: t('justification')
    }),
    required({ t })
  )(Yup.string())
})
