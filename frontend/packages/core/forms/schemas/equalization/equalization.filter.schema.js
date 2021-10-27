import * as Yup from 'yup'

import dateRange from '@britania-crm/forms/validators/dateRange.validator'

export const INITIAL_VALUES = {
  destination: {},
  client: {},
  product: {},
  origin: '',
  date: {
    from: '',
    to: ''
  }
}

export default ({ t }) => Yup.object().shape({
  destination: Yup.object(),
  client: Yup.object(),
  product: Yup.object(),
  origin: Yup.string(),
  date: dateRange({ t })(Yup.object())
})
