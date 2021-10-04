import React, { useMemo } from 'react'

import clsx from 'clsx'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'

import map from 'lodash/map'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import I18n from '@britania-crm/i18n'
import { formatBackDateToFriendlyFormat } from '@britania-crm/utils/date'
import Button from '@britania-crm/web-components/Button'

import useStyles from './styles'

const MessageCard = ({ item, handlePopoverOpen }) => {
  const classes = useStyles()

  const filterProfile = useMemo(() => {
    const profile = map(item?.messageProfile, (option) => option?.profile[0]?.name)
    return profile.join(' - ')
  }, [item])

  return (
    <Card className={ classes.root }>
      <CardContent>
        <Grid className={ classes.container }>
          <Grid item xs={ 12 }>
            <I18n as={ Typography } variant="h5" gutterBottom className={ classes.title } >
            last message
            </I18n>
            <Typography variant="h6" gutterBottom className={ classes.title2 }>
              {item.title}
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              className={ clsx(classes.info, classes.title) }
            >
              <span>{filterProfile}</span>
              <span>{formatBackDateToFriendlyFormat(item.expirationDate)}</span>
            </Typography>
          </Grid>
          <Grid item xs={ 12 } className={ classes.content }>
            {item?.content && parse(item.content)}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={ classes.buttons }>
        <I18n as={ Button } color="success" variant="outlined" onClick={ (event) => handlePopoverOpen(event, item.id) } >
      read more
        </I18n>
      </CardActions>
    </Card>
  )
}

MessageCard.propTypes = {
  item: PropTypes.object.isRequired,
  handlePopoverOpen: PropTypes.func
}

MessageCard.defaultProps = {
  anchorEl: {},
  handlePopoverOpen () {}
}

export default MessageCard
