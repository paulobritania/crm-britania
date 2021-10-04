import moment from 'moment/moment'

import { monthYearBackFormat } from '@britania-crm/utils/date'

export default ({ t }) => (YupInstance) => YupInstance
  .test('date', t('invalid date'), (value) => !value || moment(value, monthYearBackFormat, true).isValid())
