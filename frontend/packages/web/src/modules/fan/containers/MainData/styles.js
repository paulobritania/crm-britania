import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  container: { marginTop: 10 },
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
  }
})
