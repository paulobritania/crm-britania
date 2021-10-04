import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  selectButton: {
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.medium,
    color: colors.white,
    backgroundColor: colors.britSecondary.base,
    fontSize: 14,
    '&:hover': { backgroundColor: colors.britSecondary.dark }
  }
}
)
