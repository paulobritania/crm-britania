import React from 'react'

import AvatarMui from '@material-ui/core/Avatar'

import ImgProfilePlaceholder from '@britania-crm/styles/assets/images/profile_avatar_default.png'
import { useImageLoaded } from '@britania-crm/utils/files'

const Avatar = (props) => {
  const {
    src,
    srcSet,
    row,
    ...rest
  } = props

  const loaded = useImageLoaded({ src, srcSet })

  return (
    <AvatarMui
      { ...rest }
      src={ loaded ? src : ImgProfilePlaceholder }
    />
  )
}

Avatar.propTypes = { ...AvatarMui.propTypes }

export default Avatar
