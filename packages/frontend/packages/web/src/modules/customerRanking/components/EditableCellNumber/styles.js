import styled from 'styled-components'

import Box from '@material-ui/core/Box'

import colors from '@britania-crm/styles/colors'

export const Container = styled(Box)`
    display: flex;
    justify-content:center;
    margin-right:26px;
    margin-left: 26px
`
export const Input = styled.input`
    background: ${ (prop) => !prop.disabled ? '#FAFAFA' : 'transparent' };
    border: ${ (prop) => !prop.disabled ? `1px solid ${ colors.britPrimary1.lighter }` : 'none' };
    border-radius: 5px;
    height: 32px;
    width: 50px;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    [type=number] {
        -moz-appearance: textfield;
    }
`
