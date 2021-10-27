export default ({
  t, length, field, type
}) => (YupInstance) => YupInstance.min(length, t('{this} must have a min of {length} {type}', {
  this: field,
  length,
  type: type || t('digits')
}))
