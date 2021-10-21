import flow from 'lodash/fp/flow'

import minLength from './minLength.validator'
// import regex from './regex.validator'

export default ({ t }) => (YupInstance) => flow(
  // regex({
  //   t,
  //   text: 'invalid password',
  //   regex: '^(?=.*[a-z A-Z])(?=.*[0-9])'
  // }),
  minLength({
    t,
    field: t('password'),
    length: 0
  })
)(YupInstance)
