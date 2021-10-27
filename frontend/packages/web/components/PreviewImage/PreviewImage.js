import React from 'react'

import PropTypes from 'prop-types'

import useStyles from './styles'

const PreviewImage = ({
  url, rightStyles, onError, defaultImg
}) => {
  const classes = useStyles()

  return (url || defaultImg) && (
    <img src={ (url || defaultImg) } style={ rightStyles } alt="imagem" className={ classes.preview } onError={ onError }/>
  )
}

PreviewImage.propTypes = {
  rightStyles: PropTypes.object,
  url: PropTypes.string.isRequired,
  defaultImg: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  onError: PropTypes.func
}
PreviewImage.defaultProps = {
  rightStyles: {},
  onError () {},
  defaultImg: ''
}

export default PreviewImage
