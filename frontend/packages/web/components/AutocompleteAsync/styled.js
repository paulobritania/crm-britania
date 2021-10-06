import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

export const StyledTextField = styled(TextField)`
    padding: 0;
    & .MuiAutocomplete-inputRoot {
        border-radius: 50px;
        padding: 0;
        padding-left: 14px;

        & input {
            margin: 0;
            align-items: center;
            justify-content: center;
            padding: 10px 50px 10px 16px !important;
        }
        & svg {
            color: #858C94;
            font-size: 20px;
        }
    }
    & .MuiInputLabel-outlined.MuiInputLabel-shrink {
        transform: translate(14px, -8px) scale(0.85);
    }
`
