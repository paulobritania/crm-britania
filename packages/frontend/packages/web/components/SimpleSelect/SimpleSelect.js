import React from 'react'

import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { useT } from '@britania-crm/i18n'

import useStyles from './styles'

const SimpleSelect = ({
  id,
  item,
  onChange,
  value
}) => {
  const classes = useStyles()
  const t = useT()

  return (
    <div>
      <FormControl id={ id } variant="outlined" className={ classes.formControl }>
        <Select
          value={ value }
          onChange={ ({ target }) => onChange(target.value) }
          classes={ {
            root: classes.selectRoot,
            icon: classes.icon
          } }
          MenuProps={ { classes: { paper: classes.selectPaper } } }
        >
          <MenuItem value={ 0 } >{t('last message')}</MenuItem>
          {
            item.map((item) => (<MenuItem value={ item.id } key={ item.id }>{item.name}</MenuItem>))
          }
        </Select>
      </FormControl>
    </div>
  )
}

SimpleSelect.propTypes = {
  item: PropTypes.array.isRequired,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func

}

SimpleSelect.defaultProps = {
  id: 'select',
  item: [],
  value: 0,
  onChange () {}
}

export default SimpleSelect
