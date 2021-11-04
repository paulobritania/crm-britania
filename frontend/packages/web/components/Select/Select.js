import React, { useMemo, memo } from 'react'

import PropTypes from 'prop-types'

import { isEmpty, map } from 'lodash'

import { ThemeProvider } from '@material-ui/core/styles'

import { MenuItem } from '@material-ui/core'
import { Controller } from 'react-hook-form'

import { areEqual } from '@britania-crm/utils/memo'

import useStyles, {
  InputLabelStyled,
  theme as MuiTheme,
  TextFieldStyled
} from './styles'

const InputSelectStyled = ({
  name,
  control,
  label,
  idKey,
  valueKey,
  options,
  variant,
  theme,
  placeholder
}) => {
  const classes = useStyles()

  const renderedOptions = useMemo(() => {
    if (isEmpty(options)) {
      return (
        <MenuItem selected disabled value=''>
          <em>Nenhum valor</em>
        </MenuItem>
      )
    }

    return map(options, (option) => {
      const id = option[idKey]
      const name = option[valueKey]

      return (
        <MenuItem
          classes={{ root: classes.menuItem }}
          value={id}
          key={id}
          style={{ fontSize: 14 }}
        >
          {name}
        </MenuItem>
      )
    })
  }, [options, idKey, valueKey, classes])

  return (
    <ThemeProvider theme={MuiTheme(theme)}>
      <InputLabelStyled>{label}</InputLabelStyled>
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextFieldStyled
            onChange={onChange}
            value={value}
            variant={variant}
            select
            placeholder={placeholder}
          >
            {renderedOptions}
          </TextFieldStyled>
        )}
        control={control}
        name={name}
      />
    </ThemeProvider>
  )
}

InputSelectStyled.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any,
  label: PropTypes.string,
  idKey: PropTypes.string,
  valueKey: PropTypes.string,
  options: PropTypes.array,
  variant: PropTypes.string,
  setValue: PropTypes.any
}

InputSelectStyled.defaultProps = {
  name: '',
  label: '',
  idKey: '',
  valueKey: '',
  options: [],
  variant: 'outlined'
}

export default memo(InputSelectStyled, areEqual)
