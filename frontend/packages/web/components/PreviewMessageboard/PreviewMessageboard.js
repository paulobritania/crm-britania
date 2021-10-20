import React, {
  useCallback,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'

import clsx from 'clsx'
import parse from 'html-react-parser'
import moment from 'moment'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import ImageOutlined from '@material-ui/icons/ImageOutlined'

import { AppActions } from '@britania-crm/stores/app'
import colors from '@britania-crm/styles/colors'
import { formatPathToCloudStorageUrl } from '@britania-crm/utils/files'
import DownloadIcon from '@britania-crm/web-components/Icons/DownloadIcon'

import useStyles from './styles'

const PreviewMessageboard = ({ item, handlePopoverClose }) => {
  const dispatch = useCallback(useDispatch(), [])

  const classes = useStyles()

  const downloadFile = useCallback(
    ({ path, filename }) =>
      dispatch(AppActions.downloadFile(path, filename)),
    [dispatch]
  )

  const filterProfile = useMemo(() => {
    const profile = map(item?.messageProfile, (option) => option?.profile[0]?.name)
    return profile.join(' - ')
  }, [item])

  const getImage = useMemo(() => {
    const file = get(item, 'files[0].file', {})
    if (file.contentType === 'image/jpeg') {
      return file
    }
  }, [item])

  return (
    <Grid className={ classes.container }>
      <Grid item xs={ 12 }>
        <IconButton aria-label="close" className={ classes.closeButton } onClick={ handlePopoverClose }>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom className={ classes.title2 }>
          { item.title }
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={ clsx(classes.info, classes.title2) }
        >
          <span>{ filterProfile }</span>
          <span>{ moment(item.expirationDate).utc().format('DD/MM/YYYY') }</span>
        </Typography>
      </Grid>
      <Grid item xs={ 12 } className={ classes.content }>
        {item?.content && parse(item.content)}
      </Grid>
      <Grid item xs={ 12 } className={ classes.content }>
        { !isEmpty(getImage) && <img src={ formatPathToCloudStorageUrl(getImage.path) } alt="imagem" width="300px" height="300px"/> }
        <Divider classes={ { root: classes.divider } } />
      </Grid>
      <Grid item className={ classes.cardImage }>
        {
          map(item.files, ({ file }, index) =>
            <Chip
              key={ index }
              label={ file.filename }
              variant="outlined"
              deleteIcon={ <DownloadIcon className={ classes.iconImage } size={ 20 } color={ colors.primary.main } colorHover={ colors.primary.light } onClick={ () => downloadFile(file) } /> }
              onDelete={ () => downloadFile(file) }
              icon={ <ImageOutlined className={ classes.iconImage } /> }
              classes={ { root: classes.chip, label: classes.labelChip } }
            />
          )
        }
      </Grid>
    </Grid>
  )
}

PreviewMessageboard.propTypes = {
  item: PropTypes.object.isRequired,
  handlePopoverClose: PropTypes.func
}

PreviewMessageboard.defaultProps = { handlePopoverClose () {} }

export default PreviewMessageboard
