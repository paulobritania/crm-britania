import * as Yup from 'yup'

import cpfCnpj from '@britania-crm/forms/validators/cpfCnpj.validator'

export const INITIAL_VALUES = {
  status: '',
  companyName: '',
  cnpj: ''
}

export default ({ t }) => Yup.object().shape({
  cnpj: cpfCnpj({ t })(Yup.string()),
  companyName: Yup.string(),
  status: Yup.string()
})
