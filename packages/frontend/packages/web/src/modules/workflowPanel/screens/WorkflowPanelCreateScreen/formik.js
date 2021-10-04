import moment from 'moment'
import * as yup from 'yup'

const INITIAL_VALUES = {
  title: '',
  type: '',
  dateStart: '',
  dateEnd: '',
  status: true,
  description: '',
  lastUpdateLogin: '',
  version: '',
  lastUpdateDate: '',
  datePeriod: {
    from: '',
    to: ''
  }
}

export default ({ t }) => ({
  validateOnMount: true,
  validateOnBlur: true,
  validateOnChange: true,
  initialValues: INITIAL_VALUES,
  validationSchema: yup.object({
    title: yup.string().min(5, t('5 characters min length')).required(t('required field')),
    type: yup.number().required(t('required field')),
    datePeriod: yup.object({
      from: yup.date().required(t('required field')),
      to: yup.date().required(t('required field')).test('', t('end time should be greater than today'), (to) => moment(to).isSameOrAfter(moment(), 'day'))
    }),
    description: yup.string().required(t('required field'))
  })
})
