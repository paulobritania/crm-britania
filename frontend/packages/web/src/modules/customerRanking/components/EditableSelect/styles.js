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
    padding: 16px;
    border: none;
    background: ${ colors.white2 }
`
