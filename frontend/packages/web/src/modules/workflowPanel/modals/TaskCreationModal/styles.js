import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'

import { colors } from '@britania-crm/styles'

export const useStyles = makeStyles(() => ({
  blueButton: {
    '&:hover': { backgroundColor: colors.primary.main },
    marginLeft: '10px'
  }
}))

export const TreeViewArea = styled.div`
    overflow-y: auto;
    height: 400px;
    margin: 20px 0;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${ colors.white4 };
`
