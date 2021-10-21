import { validateIE } from 'validations-br'

export default ({ t, stateFieldName = 'state' }) => (YupInstance) => YupInstance.test(
  'state-registration',
  t('invalid state registration'),
  (value, { parent }) => !value || validateIE(value, parent[stateFieldName] || parent?.address?.[stateFieldName])
)
