import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles(() => ({
  button: {
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.medium,
    color: colors.britSecondary.base,
    borderColor: colors.britSecondary.base,
    '&:hover': {
      color: colors.britSecondary.dark,
      borderColor: colors.britSecondary.dark
    }
  }
}))
