import React, { memo } from 'react'

import MuiTable from 'material-table/dist/components/m-table'
import styled from 'styled-components'

const Container = styled.div`
  max-height: calc(100vh - 310px);
  width: 100%;
`

const Table = memo((props) => (
  <Container>
    <MuiTable
      { ...props }
      stickyHeader
    />
  </Container>
))

export default Table
