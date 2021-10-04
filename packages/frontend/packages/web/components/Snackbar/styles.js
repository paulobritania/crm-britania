import colors from '@britania-crm/styles/colors'

export default () => ({
  variantSuccess: { backgroundColor: `${ colors.success.main } !important` },
  variantWarning: {
    backgroundColor: `${ colors.warning } !important`,
    color: colors.text
  },
  variantError: { backgroundColor: `${ colors.error } !important` }
})
