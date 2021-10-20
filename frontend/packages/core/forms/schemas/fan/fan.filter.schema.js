import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  number: {},
  company: 'BRITÂNIA',
  parentCompanyName: {},
  representative: {}
}

export default ({ t }) => Yup.object().shape({
  number: Yup.object(),
  company: required({ t })(Yup.string()),
  parentCompanyName: Yup.object(),
  representative: Yup.object()
})
