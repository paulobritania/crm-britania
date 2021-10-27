
import React from 'react'

import PropTypes from 'prop-types'

import useStyles, {
  Container,
  Loader,
  PercentageContainer,
  Percentage
} from './styles'

const Spinner = (props) => {
  const classes = useStyles()

  return (
    <Container>
      <Loader
        { ...props }
        className={ classes.bottom }
        value={ 100 }
      />

      <Loader
        { ...props }
        className={ classes.top }
        classes={ { circle: classes.circle } }
      />

      <PercentageContainer>
        <Percentage>
          {props.value}%
        </Percentage>
      </PercentageContainer>
    </Container>
  )
}

Spinner.propTypes = { value: PropTypes.number.isRequired }

export default Spinner
