import React from 'react'

import CircularLoader from '../CircularLoader/CircularLoader'
import { Container } from './styles'

const Loading = () => (
  <Container>
    <CircularLoader color="secondary" size={ 100 } />
  </Container>
)

export default Loading
