import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles({
  containerMain: { marginTop: 10 },
  addButton: {
    color: colors.britSecondary.base,
    backgroundColor: colors.white,
    borderColor: colors.britSecondary.base
  },
  addFileButton: {
    color: colors.white,
    backgroundColor: colors.britSecondary.base
  },
  chip: { border: 'none', '& .MuiChip-deleteIcon': { width: 15, '&:hover': { color: colors.error.main } } },
  labelChip: { maxWidth: 130 },
  dateFile: { display: 'flex', justifyContent: 'flex-end' }
})
