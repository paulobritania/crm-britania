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
  btnSave: { marginLeft: 10 },
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
  labelStatus: { fontSize: '0.75em' },
  status: {
    alignItems: 'center',
    display: 'flex'
  },
  btnMargin: { marginLeft: 10 },
  checkbox: { width: '20%' }
})
