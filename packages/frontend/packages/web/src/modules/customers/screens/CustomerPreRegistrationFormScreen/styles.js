import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  container: {
    borderRadius: 25,
    padding: 30,
    backgroundColor: colors.white
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
  btnMargin: { marginLeft: 10 }
})
