import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import colors from '@britania-crm/styles/colors'

export default makeStyles(({
  upload: {
    display: 'flex',
    backgroundColor: colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginRight: 16,
    width: '80%',
    height: '100%',
    minHeight: 281,
    marginBottom: 10,
    textAlign: 'center',
    border: `${ colors.britPrimary2.lightest } solid 2px`,
    borderStyle: 'dashed'
  }
}))

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
`
