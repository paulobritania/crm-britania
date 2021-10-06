import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles((theme) => ({
  card: { padding: 5 },
  modal: {
    maxHeight: 'calc(100% - 10px)',
    borderRadius: 30
  },
  title: {
    color: colors.primary.light,
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': { marginBottom: 15 }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  input: {
    marginBottom: 20,
    '& .MuiOutlinedInput-root': { borderRadius: 15 },
    '& .MuiSelect-selectMenu': { height: '1.1876em' }
  },
  inputDate: { width: 230 },
  btn: { margin: '0px 100px 20px' },
  row: {
    display: 'flex',
    flexDirection: 'row',
    '& label:last-child': { marginLeft: 15 }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  btnCancel: { '& .MuiButton-outlinedPrimary': { border: 'none' } },
  btnSave: {
    marginLeft: 10,
    width: 160
  },
  cardImage: { padding: 10, '& div': { margin: 2 } },
  chip: { border: 'none', '& .MuiChip-deleteIcon': { width: 15, '&:hover': { color: colors.error.main } } },
  labelChip: { maxWidth: 130 }
}))
