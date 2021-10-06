import * as Yup from 'yup'

import maxLength from '@britania-crm/forms/validators/maxLength.validator'

export const INITIAL_VALUES = {
  codMatrix: '',
  lineDescription: [],
  nameBuyer: '',
  status: ''
}

export default ({ t }) => Yup.object().shape({
  codMatrix: maxLength({
    t,
    length: 14,
    type: t('characters', { howMany: 1 }),
    field: t('matrix', { howMany: 1 })
  })(Yup.string()),
  lineDescription: Yup.array(),
  nameBuyer: maxLength({
    t,
    length: 200,
    type: t('characters', { howMany: 1 }),
    field: t('buyer name')
  })(Yup.string()),
  status: Yup.bool().nullable()
})
