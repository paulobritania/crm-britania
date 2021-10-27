import isURL from 'validator/lib/isURL'

export default ({ t }) => (YupInstance) => YupInstance.test(
  'url',
  t('invalid url'),
  (value) => !value || isURL(value, {
    disallow_auth: true,
    allow_protocol_relative_urls: true
  })
)
