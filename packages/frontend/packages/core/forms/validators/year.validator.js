import moment from 'moment/moment'

export default ({ t }) => (YupInstance) => YupInstance
  .test('year', t('invalid year'), (value) => !value || moment(value, 'YYYY', true).isValid())
