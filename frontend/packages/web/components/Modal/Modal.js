import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import { useDialog } from '@britania-crm/dialog'
import Loader from '@britania-crm/web-components/Loader/LinearLoader'

import HeaderTitleClose from './HeaderTitleClose'
import useStyles from './styles'

const Modal = (props) => {
  const {
    contentText,
    children,
    id,
    open,
    escape,
    loading,
    title,
    onClose,
    FooterComponent,
    position,
    headerProps,
    fullScreen,
    disableFullScreen,
    maxWidth,
    breakFullScreen,
    hideHeader,
    contentContainerStyle,
    escapeWhenLoading,
    footerContainerStyle,
    variant,
    ...otherProps
  } = props

  const classes = useStyles()
  const { removeDialog } = useDialog()

  const [fullScreenState, setFullScreenState] = useState(fullScreen)

  const close = useCallback(
    () => {
      removeDialog({ id })
      onClose()
    },
    [id, onClose, removeDialog]
  )

  const componentsProps = useMemo(
    () => ({
      onClose: close,
      title,
      variant,
      escape: escape && (escapeWhenLoading || !loading)
    }),
    [close, escape, escapeWhenLoading, loading, title, variant]
  )

  useEffect(() => {
    setFullScreenState(fullScreen)
  }, [fullScreen])

  return (
    <Dialog
      id={ id }
      open={ open }
      onClose={ close }
      disableEscapeKeyDown={ !componentsProps.escape }
      disableBackdropClick={ !componentsProps.escape }
      disableRestoreFocus
      disableEnforceFocus
      maxWidth={ maxWidth }
      fullScreen={ fullScreenState }
      classes={ {
        scrollPaper: position === 'top' ? classes.dialogTop : undefined,
        ...(otherProps.classes || {})
      } }
      { ...otherProps }
    >
      {!hideHeader && (
        <HeaderTitleClose
          fullScreen={ fullScreenState }
          onChangeFullScreen={ () => setFullScreenState((old) => !old) }
          fullScreenButton={ !disableFullScreen }
          { ...componentsProps }
          { ...headerProps }
        />
      )}

      <DialogContent
        classes={ { root: clsx({ [classes.withoutFooter]: !FooterComponent }) } }
        style={ contentContainerStyle }
      >
        <div className={ classes.contentText }>{contentText}</div>
        {children}
      </DialogContent>

      {FooterComponent && (
        <DialogActions
          style={ footerContainerStyle }
          classes={ {
            root: clsx(
              classes.footerContainer,
              { [classes.footerCenter]: variant === 'center' }
            )
          } }
        >
          <FooterComponent { ...componentsProps } />
        </DialogActions>
      )}
      {loading !== undefined && (
        <Loader loading={ loading } value={ 0 } />
      )}
    </Dialog>
  )
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  FooterComponent: PropTypes.func,
  contentText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  escape: PropTypes.bool,
  loading: PropTypes.bool,
  escapeWhenLoading: PropTypes.bool,
  fullScreen: PropTypes.bool,
  variant: PropTypes.oneOf(['center', 'space']),
  position: PropTypes.oneOf(['middle', 'top']),
  headerProps: PropTypes.object,
  breakFullScreen: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  disableFullScreen: PropTypes.bool,
  hideHeader: PropTypes.bool,
  contentContainerStyle: PropTypes.object,
  footerContainerStyle: PropTypes.object
}

Modal.defaultProps = {
  title: null,
  FooterComponent: null,
  contentText: null,
  children: null,
  escape: true,
  loading: undefined,
  fullScreen: false,
  escapeWhenLoading: false,
  onClose () {},
  position: 'middle',
  headerProps: {},
  maxWidth: 'sm',
  breakFullScreen: 'xs',
  disableFullScreen: true,
  hideHeader: false,
  contentContainerStyle: {},
  footerContainerStyle: {},
  variant: 'center'
}

export default Modal
