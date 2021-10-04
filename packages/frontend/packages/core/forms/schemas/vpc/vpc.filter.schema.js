import * as Yup from 'yup'

import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'
import date from '@britania-crm/forms/validators/date.validator'
import dateRange from '@britania-crm/forms/validators/dateRange.validator'
import number from '@britania-crm/forms/validators/number.validator'

export const INITIAL_VALUES = {
  matrix: {},
  codMatrix: {},
  cnpj: '',
  numberBudget: '',
  typeBudget: '',
  date: {
    from: '',
    to: ''
  },
  line: '',
  regional: '',
  minValue: '',
  maxValue: '',
  taskWorkflow: '',
  version: '',
  responsibleTask: '',
  pendingApproval: '',
  sla: '',
  foundsSituation: '',
  responsible: ''
}

export default ({ t }) => Yup.object().shape({
  codMatrix: Yup.object(),
  line: Yup.lazy((value) => typeof value === 'number' ? Yup.number() : Yup.string()),
  matrix: Yup.object(),
  cnpj: cpfCnpj({ t })(Yup.string()),
  numberBudget: number({ t })(Yup.string()),
  typeBudget: Yup.string(),
  date: dateRange({ t })(Yup.object()),
  regional: Yup.string(),
  minValue: Yup.string(),
  maxValue: Yup.string(),
  taskWorkflow: Yup.string(),
  version: Yup.string(),
  responsibleTask: Yup.string(),
  pendingApproval: Yup.string(),
  sla: date({ t })(Yup.string()),
  foundsSituation: Yup.string(),
  responsible: Yup.string()
})
