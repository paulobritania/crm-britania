import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export const useStyles = makeStyles((theme) => ({
  container: { padding: 0 },
  header: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `solid 2px ${ colors.white3 }`
  },
  resetBtn: {
    borderColor: 'transparent',
    color: colors.primary.main
  },
  card: { padding: '0px' },
  btnSave: {
    marginLeft: 10,
    width: 190
  },
  title: { fontSize: '32px' },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    '& div': { margin: 2 }
  },
  checkbox: { width: '20%' },
  list: {
    width: '100%',
    '& .MuiListItem-root': { padding: 0 }
  },
  listItem: { borderBottom: `1px solid ${ colors.white3 }` },
  infoUser: { width: '25%', paddingLeft: 5 },
  infoDate: { width: '28%' },
  infoChanges: { width: '47%' },
  labelStatus: { fontSize: '0.75em' }
}))

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: ${ colors.white }; 
  padding: 24px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`

export const TreeViewContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-bottom: 80px;
  background-color: ${ colors.white5 };
`
