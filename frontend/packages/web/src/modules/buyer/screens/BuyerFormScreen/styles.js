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
    color: colors.primary.main,
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: fonts.fontSize.XLS
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
  containerTable: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: colors.britPrimary2.lightest,
    marginBottom: 15
  },
  table: {
    background: colors.white,
    padding: 10,
    borderRadius: 15
  },
  labelStatus: { fontSize: '0.75em' },
  status: {
    alignItems: 'center',
    display: 'flex'
  },
  checkbox: { width: '20%' }
})
