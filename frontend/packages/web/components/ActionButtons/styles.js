import styled from 'styled-components'

import colors from '@britania-crm/styles/colors'
import IconButton from '@britania-crm/web-components/IconButton'

export const ContainerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

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
    color: ${colors.primary.text};

    &:hover {
      background-color: transparent;
    }
  }
`
