
export default (value) => {
  if (value > '23:59' && value.length < 5) {
    return '09:99'
  }

  if (value > '23:59') {
    return '00:00'
  }
  return '99:99'
}
