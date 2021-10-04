import isEqual from 'lodash/isEqual'

export default ({
  t, text = 'fields do not match', compareWith
}) => (YupInstance) => YupInstance
  .test('equal', t(text), (value) => isEqual(value, compareWith))
