import React from 'react'

import PropTypes from 'prop-types'

import ImgProfilePlaceholder from '@britania-crm/styles/assets/images/profile_avatar_default.png'
import { useImageLoaded } from '@britania-crm/utils/files'

const Image = (props) => {
  const {
    src,
    alt,
    defaultImage,
    ...rest
  } = props

  const loaded = useImageLoaded({ src })

  return (
    <img
      { ...rest }
      alt={ alt }
      src={ loaded ? src : defaultImage }
    />
  )
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  defaultImage: PropTypes.string
}

Image.defaultProps = {
  src: undefined,
  defaultImage: ImgProfilePlaceholder
}

export default Image
