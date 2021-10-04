import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24
  },
  resetBtn: {
    borderColor: 'transparent',
    color: colors.britPrimary2.base
  },
  btnCancel: {
    marginLeft: 10,
    width: 100
  },
  btnSave: {
    marginLeft: 10,
    width: 190
  }
})
