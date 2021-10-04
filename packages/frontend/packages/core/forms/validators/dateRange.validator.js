import moment from 'moment/moment'
import * as Yup from 'yup'

import { dateBackFormat } from '@britania-crm/utils/date'

import date from './date.validator'
import minDate from './minDate.validator'

export default ({
  t, minFrom, minTo
}) => (YupInstance) => {
  let fromSchema = date({ t })(Yup.string())
  if (minFrom) {
    fromSchema = minDate({ t, minDate: minFrom })(fromSchema)
  }

  let toSchema = date({ t })(Yup.string())
  if (minTo) {
    toSchema = minDate({ t, minDate: minTo })(toSchema)
  }

  return YupInstance
    .shape({
      from: fromSchema,
      to: toSchema
    })
    .nullable()
    .test(
      'valid range',
      t('invalid date range'),
      (value) => {
        if (value.from && value.to) {
          const fromMoment = moment(value.from, dateBackFormat)
          const toMoment = moment(value.to, dateBackFormat)

          if (
            fromMoment.isValid() &&
            toMoment.isValid() &&
            fromMoment.isAfter(toMoment)
          ) {
            return false
          }
        }
        return true
      }
    )
}
