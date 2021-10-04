import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'

export default ({ t }) => (YupInstance) => YupInstance.test(
  'file',
  t('invalid file'),
  (value) => {
    if (value instanceof File || isEmpty(value) || isString(value) || value?.id) {
      return true
    }

    return false
  }
)
