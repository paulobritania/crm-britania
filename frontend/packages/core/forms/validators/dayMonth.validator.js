import moment from 'moment/moment'

import {
  dateBackFormat,
  leapYear
} from '@britania-crm/utils/date'

export default ({ t }) => (YupInstance) => YupInstance
  .test('date', t('invalid date'), (value) => !value || moment(`${ leapYear }-${ value }`, dateBackFormat, true).isValid())
