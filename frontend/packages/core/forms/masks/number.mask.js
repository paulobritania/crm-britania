import fill from 'lodash/fill'
import toNumber from 'lodash/toNumber'

export default (value, { maxLength, max }) => {
  const arr = fill(Array(maxLength), '9')
  if (toNumber(value) > max) {
    return `${ max }`
  }

  return arr.join('')
}
