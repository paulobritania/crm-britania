export default ({
  t, field, length, type
}) => (YupInstance) =>
  YupInstance.test(
    'length',
    t('{this} must have a max of {length} {type}', {
      this: field, length, type
    }),
    (value = '') => !value || value.length <= length
  )
