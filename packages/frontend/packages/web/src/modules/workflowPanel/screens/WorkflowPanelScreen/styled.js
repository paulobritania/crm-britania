import styled, { css } from 'styled-components'

import Paper from '@material-ui/core/Paper'

import colors from '@britania-crm/styles/colors'
import EditIconSVG from '@britania-crm/web-components/Icons/EditIcon'
import ViewIconSVG from '@britania-crm/web-components/Icons/ViewIcon'

export const EditIcon = styled(EditIconSVG)`
&:hover {
  ${ ({ disabled }) => !disabled && css`
  cursor: pointer;
  &>path{ fill: ${ colors.info.main };}` }
}
`

export const ViewIcon = styled(ViewIconSVG)`
&:hover {
  cursor: pointer;
  &>path{ stroke: ${ colors.success.light };}
}
`

export const TableToolTipText = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const Container = styled(Paper)`
  border-radius: 25px;
  padding: 15px;
`
