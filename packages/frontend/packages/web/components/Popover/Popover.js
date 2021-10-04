import React, {
  useMemo,
  forwardRef,
  useImperativeHandle
} from 'react'

import PopupState, {
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state'
import PropTypes from 'prop-types'

import PopoverMui from '@material-ui/core/Popover'

const Controller = forwardRef((props, ref) => {
  const {
    popoverId,
    Component,
    ComponentProps,
    anchorOrigin,
    transformOrigin,
    children,
    popupState,
    popoverStyle,
    ...rest
  } = props

  const trigger = useMemo(
    () => bindTrigger(popupState),
    [popupState]
  )

  const popover = useMemo(
    () => bindPopover(popupState),
    [popupState]
  )

  useImperativeHandle(ref, () => ({ ...popover }))

  return (
    <div>
      <Component { ...ComponentProps } { ...trigger } popupState={ popupState } />

      <PopoverMui
        { ...popover }
        anchorOrigin={ anchorOrigin }
        transformOrigin={ transformOrigin }
        style={ { ...popoverStyle } }
        { ...rest }
      >
        {children}
      </PopoverMui>
    </div>
  )
})

const Popover = forwardRef((props, ref) => (
  <PopupState variant="popover" popupId={ props.popoverId }>
    {(popupState) => <Controller ref={ ref } { ...props } popupState={ popupState } />}
  </PopupState>
))

Popover.propTypes = {
  popoverId: PropTypes.string.isRequired,
  Component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  ComponentProps: PropTypes.object,
  popoverStyle: PropTypes.object,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'center', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right'])
  }),
  transformOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'center', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'center', 'right'])
  }),
  children: PropTypes.any
}

Popover.defaultProps = {
  ComponentProps: {},
  popoverStyle: {},
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center'
  },
  children: null
}

Controller.propTypes = {
  ...Popover.propTypes,
  popupState: PropTypes.object.isRequired
}

Controller.defaultProps = { ...Popover.defaultProps }

export default Popover
