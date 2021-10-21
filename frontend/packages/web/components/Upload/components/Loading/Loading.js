import React from 'react'

import CircularLoader from '@britania-crm/web-components/Loader/CircularLoader'

import { Container } from './styles'

const Loading = () => (
  <Container>
    <CircularLoader relative size={ 70 } />
  </Container>
)

export default Loading
