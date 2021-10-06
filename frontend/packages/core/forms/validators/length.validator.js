export default ({
  t, field, length
}) => (YupInstance) =>
  YupInstance.test(
    'length',
    t('{this} must have {length} digits', { this: field, length }),
    (value) => value.length === length
  )
