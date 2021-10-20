import styled from 'styled-components'

import MuiButton from '@material-ui/core/Button'
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
  contractPercentage: {
    borderRadius: 21,
    padding: 10,
    margin: 5,
    boxShadow: `0 6.933997631072998px 13.867995262145996px 0 ${ colors.grey5 }`
  },
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
    backgroundColor: colors.britPrimary2.lightest
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
  checkbox: { width: '20%' },
  containerRanking: { marginTop: 10 },
  ranking: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  }
})

export const HistoryButton = styled(MuiButton)`
  color: ${ colors.britSecondary.base };
  border-color: ${ colors.britSecondary.base };
`
