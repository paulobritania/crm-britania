import React, {
  useRef,
  useMemo,
  useCallback,
  forwardRef
} from 'react'

import PropTypes from 'prop-types'

import capitalize from 'lodash/capitalize'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'

import CircularProgress from '@material-ui/core/CircularProgress'

import Popover from '@britania-crm/web-components/Popover'
import Tooltip from '@britania-crm/web-components/Tooltip'

import useStyles, { StyledIconButton } from './styles'

const IconButton = forwardRef((props, ref) => {
  const {
    children,
    tooltip,
    popover,
    popoverProps,
    marginVertical,
    marginHorizontal,
    className: externalClassName,
    loading,
    placement,
    debounce: _,
    debounceReverse,
    onClick,
    color: externalColor,
    ...rest
  } = props

  const btnRef = useRef(null)

  const classes = useStyles()

  const popoverId = useMemo(
    () => props.popover ? Math.floor(Math.random() * 1000).toString() : null,
    [props.popover]
  )

  const debounceConfig = useMemo(
    () => {
      if (props.debounceReverse) {
        return {
          leading: true,
          trailing: false
        }
      }
      return {}
    },
    [props.debounceReverse]
  )

  const handleClick = useCallback(
    debounce(
      (...e) => onClick(...e),
      props.debounce || 1,
      debounceConfig
    ),
    [onClick]
  )

  const isDefaultColor = useMemo(
    () => ['default', 'inherit', 'primary', 'secondary'].indexOf(externalColor) > -1,
    [externalColor]
  )

  const color = useMemo(
    () => isDefaultColor ? externalColor : undefined,
    [externalColor, isDefaultColor]
  )

  const className = useMemo(
    () => [
      !isDefaultColor ? classes[`color-${ capitalize(externalColor) }`] : undefined,
      externalClassName
    ].join(' '),
    [classes, externalClassName, externalColor, isDefaultColor]
  )

  const button = useMemo(
    () => {
      let btn = (
        <span
          key="iconButton"
          ref={ btnRef }
          aria-owns={ popoverId }
          aria-haspopup={ popover.toString() }
          className={ classes.spanIconButton }
        >
          <StyledIconButton
            ref={ ref }
            { ...rest }
            color={ color }
            className={ className }
            onClick={ loading ? undefined : handleClick }
          >
            {
              loading
                ? <CircularProgress color="inherit" size={ 22 } />
                : children
            }
          </StyledIconButton>
        </span>
      )

      if (!isEmpty(tooltip)) {
        btn = (
          <Tooltip title={ tooltip } placement={ placement }>
            {btn}
          </Tooltip>
        )
      }
      if (marginVertical || marginHorizontal) {
        btn = (
          <div
            className={ [
              marginHorizontal ? classes.iconButtonMarginHorizontal : null,
              marginVertical ? classes.iconButtonMarginVertical : null
            ].join(' ') }
          >
            {btn}
          </div>
        )
      }
      return btn
    },
    [children, className, classes.iconButtonMarginHorizontal, classes.iconButtonMarginVertical, classes.spanIconButton, color, handleClick, loading, marginHorizontal, marginVertical, placement, popover, popoverId, ref, rest, tooltip]
  )

  return popover
    ? (
      <>
        {button}
        <Popover key="popover" popoverId={ popoverId } { ...popoverProps } anchorEl={ btnRef } />
      </>
    )
    : button
})

IconButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  popover: PropTypes.bool,
  popoverProps: PropTypes.shape(),
  tooltip: PropTypes.string,
  className: PropTypes.string,
  marginVertical: PropTypes.bool,
  marginHorizontal: PropTypes.bool,
  loading: PropTypes.bool,
  debounce: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  debounceReverse: PropTypes.bool,
  placement: PropTypes.string,
  /** Used to control the button's purpose,
   This property passes the value to the type attribute of the native button component. */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  color: PropTypes.string
}

IconButton.defaultProps = {
  children: '',
  onClick () {},
  popover: false,
  popoverProps: {},
  tooltip: null,
  className: null,
  marginVertical: false,
  marginHorizontal: true,
  loading: false,
  debounce: 200,
  debounceReverse: false,
  placement: 'bottom',
  type: 'button',
  color: 'default'
}

export default IconButton
