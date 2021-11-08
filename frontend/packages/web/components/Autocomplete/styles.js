import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

export const InputTextStyled = styled(TextField)`
  padding: 0;
  & .MuiAutocomplete-inputRoot {
    border-radius: 3px;
    border: 1px solid #8492a6;
    padding: 0;
    padding-left: 14px;

    & input {
      margin: 0;
      align-items: center;
      justify-content: center;
      padding: 10px 50px 10px 0 !important;
    }
    & svg {
      color: #858c94;
      font-size: 20px;
    }
  }
`
