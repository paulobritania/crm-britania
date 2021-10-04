import * as Yup from 'yup'

import dateRange from '@britania-crm/forms/validators/dateRange.validator'

export const INITIAL_VALUES = {
  title: '',
  typeId: '',
  status: '',
  period: {
    from: '',
    to: ''
  }
}

export default ({ t }) => Yup.object().shape({
  title: Yup.string(),
  typeId: Yup.string(),
  status: Yup.string(),
  period: dateRange({ t })(Yup.object())
})
