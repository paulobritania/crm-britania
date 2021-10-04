import forEach from 'lodash/forEach'
export const generateParamsUrl = (filters) => {
  const url = []

  forEach(filters, (value, key) => {
    if (Object.prototype.hasOwnProperty.call(filters, key)) {
      url.push(`${ encodeURIComponent(key) }=${ encodeURIComponent(filters[key]) }`)
    }
  })
  return url.join('&')
}
