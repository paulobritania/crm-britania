import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  percentage: '',
  determinationBasis: '',
  budgetDescription: '',
  periodicity: '',
  discount: '',
  basisOfCalculation: '',
  slaughterReturn: false
}

export default ({ t }) => Yup.object().shape({
  percentage: required({ t })(Yup.string()),
  determinationBasis: required({ t })(Yup.string()),
  budgetDescription: required({ t })(Yup.string()),
  periodicity: required({ t })(Yup.string()),
  discount: required({ t })(Yup.string()),
  basisOfCalculation: required({ t })(Yup.string()),
  slaughterReturn: required({ t, isNotText: true })(Yup.bool())
})
