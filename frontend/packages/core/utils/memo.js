
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'

export const areEqual = (prevProps, nextProps) => {
  const diff = reduce(
    nextProps,
    (acc, value, name) => {
      if (!isEqual(value, prevProps[name])) {
        return { ...acc, [name]: [prevProps[name], value] }
      }
      return acc
    },
    {}
  )
  return isEmpty(diff)
}
