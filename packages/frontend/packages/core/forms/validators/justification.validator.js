import flow from 'lodash/fp/flow'

import maxLength from '@britania-crm/forms/validators/maxLength.validator'
import minLength from '@britania-crm/forms/validators/minLength.validator'
import required from '@britania-crm/forms/validators/required.validator'

export default ({ t }) => (YupInstance) => flow(
  minLength({
    t,
    length: 3,
    field: t('justification')
  }),
  maxLength({
    t,
    length: 100,
    field: t('justification'),
    type: t('characters')
  }),
  required({ t })
)(YupInstance)
