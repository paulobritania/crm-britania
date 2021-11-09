import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import { TextField } from '@material-ui/core'

const useStyles = makeStyles({
  menuItem: {
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    alignItems: 'center',
    marginTop: -1
  },
  checkbox: { padding: 0, marginRight: 8 },
  placeholder: {
    '& div > div': {
      color: '#b8b8b8',
      fontSize: 14
    }
  }
})

export const TextFieldStyled = styled(TextField).withConfig({
  shouldForwardProp: (propName) =>
    propName !== 'minWidth' && propName !== 'validateOnBlur'
})`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};

  pointer-events: ${(props) => (props.readOnly ? 'none' : 'auto')};

  input {
    font-size: 14px;
  }
`

export default useStyles
