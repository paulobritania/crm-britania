import React from 'react'

import PropTypes from 'prop-types'

import {
  Label,
  IconPlace,
  Image,
  Wrapper
} from './styles'

const ElevatedButton = (props) => {
  const {
    icon: Icon, label, onPress
  } = props
  const handlePress = onPress || (() => null)

  return (
    <Wrapper onClick={ handlePress }>
      <Image />
      <IconPlace>
        <Icon />
      </IconPlace>
      <Label>
        {label}
      </Label>
    </Wrapper>
  )
}

ElevatedButton.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  label: PropTypes.string,
  onPress: PropTypes.func
}

ElevatedButton.defaultProps = {
  icon: () => null,
  label: '',
  onPress: () => null
}

export default ElevatedButton
