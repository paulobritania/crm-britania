import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  value: '',
  description: '',
  periodicity: '',
  discount: '',
  determinationBasis: '',
  basisOfCalculation: '',
  slaughterReturn: false
}

export default ({ t }) => Yup.object().shape({
  value: required({ t })(Yup.string()),
  description: required({ t })(Yup.string()),
  periodicity: required({ t })(Yup.string()),
  discount: required({ t })(Yup.string()),
  determinationBasis: required({ t })(Yup.string()),
  basisOfCalculation: required({ t })(Yup.string()),
  slaughterReturn: required({ t, isNotText: true })(Yup.bool())
})
