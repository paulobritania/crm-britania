import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import phone from '@britania-crm/forms/validators/phone.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const INITIAL_VALUES = {
  name: '',
  phone: ''
}

export default ({ t }) => Yup.object().shape({
  name: required({ t })(Yup.string()),
  phone: flow(
    phone({ t }),
    required({ t })
  )(Yup.string())
})
