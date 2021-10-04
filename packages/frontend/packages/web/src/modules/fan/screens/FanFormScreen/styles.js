import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export default makeStyles({
  container: {
    borderRadius: 25,
    padding: 30,
    backgroundColor: colors.white,
    marginBottom: 25
  },
  header: {
    display: 'flex',
    flexDirection: 'row'
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
  addAdditive: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  btnAdditive: {
    color: colors.britSecondary.base,
    backgroundColor: colors.white,
    borderColor: colors.britSecondary.base
  },
  resetBtn: {
    borderColor: 'transparent',
    color: colors.britPrimary2.base
  },
  btnSave: {
    marginLeft: 10,
    width: 100
  },
  btnConclude: {
    marginLeft: 10,
    width: 190
  },
  generateReportBtn: {
    color: colors.britSecondary.base,
    backgroundColor: colors.white,
    borderColor: colors.britSecondary.base
  },
  containerMain: { marginTop: 10 },
  containerAddButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
