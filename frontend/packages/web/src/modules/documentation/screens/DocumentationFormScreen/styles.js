import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  container: {
    borderRadius: 25,
    padding: 30,
    backgroundColor: colors.white
  },
  title: {
    color: colors.primary.light,
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: fonts.fontSize.XL
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
  },
  containerMain: { marginTop: 10 },
  containerAddButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    color: colors.white,
    backgroundColor: colors.britSecondary.base
  },

  upload: {
    display: 'flex',
    backgroundColor: colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginRight: 16,
    width: '80%',
    height: '100%',
    minHeight: 281,
    textAlign: 'center',
    border: `${ colors.britPrimary2.lightest } solid 2px`,
    borderStyle: 'dashed'
  },
  preview: { width: 281 }
})
