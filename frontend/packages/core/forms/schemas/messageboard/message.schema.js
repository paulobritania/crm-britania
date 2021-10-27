import moment from 'moment/moment'
import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import date from '@britania-crm/forms/validators/date.validator'
import minDate from '@britania-crm/forms/validators/minDate.validator'
import required from '@britania-crm/forms/validators/required.validator'
import { dateBackFormat } from '@britania-crm/utils/date'

export const INITIAL_VALUES = {
  title: '',
  expirationDate: '',
  homeScreen: false,
  content: '',
  files: [],
  profiles: []
}

export default ({ t }) => Yup.object().shape({
  title: required({ t })(Yup.string()),
  expirationDate: flow(
    minDate({ t, minDate: moment().format(dateBackFormat) }),
    date({ t }),
    required({ t })
  )(Yup.string()),
  homeScreen: Yup.bool(),
  content: required({ t })(Yup.string()),
  files: Yup.array(),
  profiles: required({ t, isNotText: true })(Yup.array())
})
