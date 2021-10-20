import styled from 'styled-components'

import colors from '@britania-crm/styles/colors'
import IconButton from '@britania-crm/web-components/IconButton'

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: -15px;
  align-items: center;

  > :not(:first-child) {
    // padding: 0 10px;
  }

  div {
    font-size: 14px;
    font-weight: normal;
  }

  fieldset {
    border: 1px solid ${ colors.britSupport1.light };
  }
`

export const InputContainer = styled.div`
  width: ${ (props) => props.width }
`

export const RadioContainer = styled.div`
  padding: 0 8px;
`

export const ContainerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -10px;
  padding-left: 10px;
  
  button {
    margin-right: 26px;
    padding: 0;

    &:last-child {
      margin-right: 0;
    } 
  } 
`
export const ActionIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    color: ${ colors.primary.text };
    
    &:hover {
      background-color: transparent;
    }
  }
`
