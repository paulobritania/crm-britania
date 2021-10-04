import * as Yup from 'yup'

import dateRange from '@britania-crm/forms/validators/dateRange.validator'

export const INITIAL_VALUES = {
  line: [],
  regional: {},
  responsibleForService: {},
  matrix: {},
  date: {
    from: '',
    to: ''
  }
}

export default ({ t }) => Yup.object().shape({
  line: Yup.array(),
  regional: Yup.object(),
  responsibleForService: Yup.object(),
  matrix: Yup.object(),
  date: dateRange({ t })(Yup.object())
})
