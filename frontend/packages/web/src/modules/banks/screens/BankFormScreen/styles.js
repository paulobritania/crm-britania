import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'

import InputLabel from '@material-ui/core/InputLabel'

import colors from '@britania-crm/styles/colors'
import fonts from '@britania-crm/styles/fonts'

export const useStyles = makeStyles(() => ({
  container: {
    padding: 30,
    backgroundColor: colors.white
  },
  title: {
    color: colors.primary.main,
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: fonts.fontSize.XLS,
    fontStyle: 'normal',
    fontFamily: fonts.fontFaceMavenPro[0].fontFamily,
    fontWeight: fonts.fontWeight.bold,
    color: '#1F2D3D'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 24
  },
  resetBtn: {
    color: colors.britPrimary2.base
  },
  btnSave: {
    marginLeft: 10,
    width: 190
  },
  dividerTop: {
    margin: '20px 0 20px 0',
    background: '#EFF2F7',
    height: '2px',
    width: '100%'
  },
  dividerBottom: {
    marginTop: 20,
    background: '#EFF2F7',
    height: '2px',
    width: '100%'
  }
}))

export const InputLabelStyled = styled(InputLabel)`
  font-size: '18px';
  color: ${colors.grey80};
`
