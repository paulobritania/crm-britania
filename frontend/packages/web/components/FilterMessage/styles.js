import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 400,
    borderRadius: 25,
    padding: 24
  },
  container: { maxWidth: 400 },
  cardContent: { padding: 0 },
  title: {
    color: theme.palette.primary.black,
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  itens: {
    display: 'flex',
    flexDirection: 'column'
    // '& div': { width: 'auto', marginBottom: 10 }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& button': { width: 120 },
    '& button:first-child': { marginLeft: 5 }

  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  input: {
    marginBottom: 15,
    borderRadius: 15,
    '& .MuiOutlinedInput-root': { borderRadius: 15, '&:houver': { borderRadius: 15 } },
    '& .MuiSelect-selectMenu': { height: '1.1876em' },
    '& .MuiSelect-select:focus': { borderRadius: 15, height: '1.1876em' }
  },
  border: { borderRadius: 15 }
}))

export default useStyles
