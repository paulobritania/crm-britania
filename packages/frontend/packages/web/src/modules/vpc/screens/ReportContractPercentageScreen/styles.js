import styled from 'styled-components'

import Paper from '@material-ui/core/Paper'

import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'

export const Container = styled(Paper)`
    border-radius: 25px;
    padding: 15px;
`
export const ContainerTable = styled(Paper)`
    background-color: rgba(226, 232, 238, 0.1);
    border-radius: 25px;
    margin-top: 16px;
    padding: 50px !important;
`
export const ButtonAddNewProfile = styled(Button)`
    font-family: 'Poppins';
    font-size: 12px;
`
export const CompaniesBranch = styled(Paper)`
  margin: 5px 0px 5px;
  background-color: ${ colors.britPrimary2.lightest };
`
