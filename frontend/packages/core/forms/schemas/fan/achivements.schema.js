import * as Yup from 'yup'

import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  startPercentage: '',
  endPercentage: '',
  bonus: '',
  periodicity: '',
  determinationBasis: '',
  basisOfCalculation: '',
  slaughterReturn: false
}

export default ({ t }) => Yup.object().shape({
  startPercentage: required({ t })(Yup.string()),
  endPercentage: required({ t })(Yup.string()),
  bonus: required({ t })(Yup.string()),
  periodicity: required({ t })(Yup.string()),
  determinationBasis: required({ t })(Yup.string()),
  basisOfCalculation: required({ t })(Yup.string()),
  slaughterReturn: required({ t, isNotText: true })(Yup.bool())
})
