import upperCase from 'lodash/upperCase'

export default (_, { state }) => {
  const upperState = upperCase(state)

  switch (upperState) {
    case 'AC': return '99.999.999/999-99'
    case 'AM': return '99.999.999-9'
    case 'BA': return '999999-99'
    case 'CE': return '99999999-9'
    case 'DF': return '99999999999-99'
    case 'GO': return '99.999.999-9'
    case 'MT': return '9999999999-9'
    case 'MG': return '999.999.999-9999'
    case 'PA': return '99-999999-9'
    case 'PB': return '99999999-9'
    case 'PR': return '99999999-99'
    case 'PE': return '99.9.999.9999999-9'
    case 'RJ': return '99.999.99-9'
    case 'RN': return '99.999.999-9'
    case 'RS': return '999/9999999'
    case 'RO': return '999.99999-9'
    case 'RR': return '99999999-9'
    case 'SC': return '999.999.999'
    case 'SP': return '999.999.999.999'
    case 'SE': return '999999999-9'
    default: return '9999999999999999999'
  }
}
