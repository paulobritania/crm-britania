import React, { useMemo } from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle'

import CloseIconButton from '@britania-crm/web-components/IconButton/CloseIconButton/CloseIconButton'
import FullScreenExitIconButton from '@britania-crm/web-components/IconButton/FullScreenExitIconButton'
import FullScreenIconButton from '@britania-crm/web-components/IconButton/FullScreenIconButton/FullScreenIconButton'

import useStyles from './styles'

const HeaderTitleClose = (props) => {
  const {
    title,
    disableTypography,
    titleClass,
    onClose,
    escape,
    containerClass,
    fullScreenButton,
    fullScreen,
    onChangeFullScreen,
    variant
  } = props

  const classes = useStyles()

  const fullScreenIconButton = useMemo(() => {
    if (fullScreenButton) {
      let CustomButton = FullScreenIconButton
      if (fullScreen) {
        CustomButton = FullScreenExitIconButton
      }
      return <CustomButton size="small" className={ classes.fullScreenIcon } marginHorizontal marginVertical onClick={ onChangeFullScreen } />
    }
    return null
  }, [fullScreenButton, fullScreen, classes.fullScreenIcon, onChangeFullScreen])

  return (
    <div className={ [classes.header, containerClass].join(' ') }>
      <DialogTitle
        className={ clsx({
          [classes.title]: true,
          [titleClass]: true,
          [classes.center]: variant === 'center'
        }) }
        disableTypography={ disableTypography }
      >
        {title}
      </DialogTitle>
      <div
        style={ {
          position: 'absolute',
          width: '98%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: 10
        } }
      >
        {fullScreenIconButton}
        {escape && (
          <CloseIconButton size="small" className={ classes.closeIcon } marginHorizontal marginVertical onClick={ onClose } />
        )}
      </div>
    </div>
  )
}

HeaderTitleClose.propTypes = {
  escape: PropTypes.bool.isRequired,
  disableTypography: PropTypes.bool,
  titleClass: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func,
  containerClass: PropTypes.string,
  fullScreenButton: PropTypes.bool,
  fullScreen: PropTypes.bool.isRequired,
  onChangeFullScreen: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired
}

HeaderTitleClose.defaultProps = {
  disableTypography: false,
  title: null,
  titleClass: null,
  onClose () {},
  containerClass: null,
  fullScreenButton: false
}

export default HeaderTitleClose
