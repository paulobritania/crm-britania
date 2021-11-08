import React, { useMemo, memo } from 'react'

import PropTypes from 'prop-types'

import { isEmpty, map } from 'lodash'

import { Controller } from 'react-hook-form'
import {
  CircularProgress,
  InputAdornment,
  MenuItem,
  InputLabel
} from '@material-ui/core'

import { areEqual } from '@britania-crm/utils/memo'

import useStyles, { TextFieldStyled } from './styles'

const InputSelectStyled = ({
  name,
  control,
  label,
  idKey,
  valueKey,
  options,
  variant,
  loading,
  clearable,
  value,
  customChange
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

  const EndAdornment = useMemo(
    () =>
      (loading || clearable) && (
        <>
          <InputAdornment style={{ marginRight: 12 }} position='end'>
            {clearable && value && <CloseIconButton size='small' />}
            {loading && (
              <CircularProgress disableShrink color='inherit' size={20} />
            )}
          </InputAdornment>
        </>
      ),
    [clearable, loading, value]
  )

  return (
    <>
      <InputLabel style={{ margin: '5px auto', color: '#1F2D3D' }}>
        {label}
      </InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <TextFieldStyled
            onChange={customChange || onChange}
            value={value}
            variant={variant}
            select
            disabled={loading}
            InputProps={{
              endAdornment: EndAdornment
            }}
            SelectProps={{
              MenuProps: {
                style: { height: 300 },
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left'
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left'
                },
                getContentAnchorEl: null
              }
            }}
          >
            {renderedOptions}
          </TextFieldStyled>
        )}
        control={control}
        name={name}
      />
    </>
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
  setValue: PropTypes.any,
  loading: PropTypes.bool,
  clearable: PropTypes.bool,
  customChange: PropTypes.func
}

InputSelectStyled.defaultProps = {
  name: '',
  label: '',
  idKey: '',
  valueKey: '',
  options: [],
  variant: 'outlined',
  loading: false,
  clearable: false,
  customChange: null
}

export default memo(InputSelectStyled, areEqual)
