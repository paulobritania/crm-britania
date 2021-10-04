
import fonts from '@britania-crm/styles/fonts'

export default () => ({
  '@global': {
    '@font-face': [
      ...fonts.fontFaceMavenPro,
      ...fonts.fontFacePoppins,
      ...fonts.fontFaceMonospace
    ],
    'html, body, #root': {
      fontFamily: fonts.fontFamilySans,
      fontWeight: fonts.regular,
      // width: '100%',
      // height: '100%',
      padding: 0,
      margin: 0,
      // flex: 1
      backgroundColor: '#E5E5E5'
    },
    // html: {
    //   overflow: 'hidden'
    // },
    // '#root': {
    //   display: 'flex',
    //   overflow: 'auto',
    //   whiteSpace: 'pre-line'
    // },
    'code, pre, em': {
      fontFamily: `${ fonts.fontFamilyMonospace } !important`,
      '& *': { fontFamily: `${ fonts.fontFamilyMonospace } !important` }
    },
    a: { textDecoration: 'none' },
    form: { width: '100%' }
  }
})
