
import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  heading: {
    fontSize: fonts.fontSize.L,
    marginTop: 29,
    marginBottom: 8,
    color: colors.britPrimary1.base,
    fontWeight: fonts.fontWeight.medium,
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily
  },
  iconInfo: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})
