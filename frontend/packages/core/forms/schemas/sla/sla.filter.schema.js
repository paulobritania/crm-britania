import * as Yup from 'yup'

import dateRange from '@britania-crm/forms/validators/dateRange.validator'

export const INITIAL_VALUES = {
  parentCompany: '',
  date: {
    from: '',
    to: ''
  }
}

export default ({ t }) => Yup.object().shape({
  parentCompany: Yup.object(),
  date: dateRange({ t })(Yup.object())
})
