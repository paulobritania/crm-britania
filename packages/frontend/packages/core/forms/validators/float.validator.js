const regexOnlyNumbers = /^[0-9]*\.[0-9]+|[0-9]+$/
export default ({ t }) => (YupInstance) => YupInstance.matches(regexOnlyNumbers, t('invalid number'))
