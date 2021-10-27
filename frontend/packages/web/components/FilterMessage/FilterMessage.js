import React, {
  useState,
  useCallback,
  useMemo
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import map from 'lodash/map'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

import I18n, { useT } from '@britania-crm/i18n'
import { MessageActions } from '@britania-crm/stores/message'
import Button from '@britania-crm/web-components/Button'

import useStyles from './styles'

const FilterMessage = ({ options, handlePopoverClose }) => {
  const classes = useStyles()
  const t = useT()
  const dispatch = useCallback(useDispatch(), [])

  const [title, setTitle] = useState('')
  const [profile, setProfile] = useState('')
  const [expirationDate, setExpirationDate] = useState('')

  const validForm = useMemo(() => {
    if (title || profile || expirationDate) {
      return false
    }
    return true
  }, [title, profile, expirationDate])

  const handleFilter = useCallback(
    () => {
      dispatch(MessageActions.getFilteredMessages({
        title, profiles: profile, expirationDate
      }))
      handlePopoverClose()
    },
    [expirationDate, dispatch, handlePopoverClose, profile, title]
  )

  return (
    <Card className={ classes.root }>
      <CardContent classes={ { root: classes.cardContent } }>
        <Grid className={ classes.container }>
          <Grid item xs={ 12 }>
            <IconButton
              aria-label="close"
              className={ classes.closeButton }
              onClick={ handlePopoverClose }
            >
              <CloseIcon />
            </IconButton>
            <I18n as={ Typography } variant="h4" gutterBottom className={ classes.title } >
            tilte modal filter
            </I18n>
          </Grid>
          <Grid item xs={ 12 } className={ classes.itens }>
            <TextField
              value={ title }
              onChange={ ({ target }) => setTitle(target.value) }
              name="title"
              label={ t('title') }
              variant="outlined"
              classes={ { root: classes.input } }
            />
            <FormControl variant="outlined" classes={ { root: classes.input } }>
              <InputLabel id="label">Perfil</InputLabel>
              <Select
                value={ profile }
                onChange={ ({ target }) => setProfile(target.value) }
                label={ t('perfil') }
              >
                {map(options, ({ id, name }) => (
                  <MenuItem value={ id } key={ id }>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={ t('date') }
              type="date"
              value={ expirationDate }
              name="expirationDate"
              variant="outlined"
              onChange={ ({ target }) => setExpirationDate(target.value) }
              classes={ { root: classes.input } }
              InputLabelProps={ { shrink: true } }
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={ classes.buttons }>
        <I18n
          as={ Button }
          color="secondary"
          variant="outlined"
          onClick={ handlePopoverClose }
        >
          cancel
        </I18n>

        <I18n
          as={ Button }
          color="secondary"
          variant="contained"
          onClick={ handleFilter }
          disabled={ validForm }
        >
          filter
        </I18n>
      </CardActions>
    </Card>
  )
}

FilterMessage.propTypes = {
  options: PropTypes.array.isRequired,
  handlePopoverClose: PropTypes.func
}

FilterMessage.defaultProps = {
  handlePopoverClose () {},
  options: []
}

export default FilterMessage
