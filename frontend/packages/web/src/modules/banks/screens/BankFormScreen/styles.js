import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const useStyles = makeStyles(() => ({
  container: {
    padding: 30,
    backgroundColor: colors.white
  },
  title: {
    color: colors.primary.main,
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: fonts.fontSize.XLS,
    fontStyle: 'normal',
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.bold,
    color: '#1F2D3D'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24
  },
  resetBtn: {
    borderColor: 'transparent',
    color: colors.britPrimary2.base
  },
  btnSave: {
    marginLeft: 10,
    width: 190
  }
}))
