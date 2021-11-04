import React, { useMemo, useCallback, forwardRef, memo } from 'react'

import PropTypes from 'prop-types'

import find from 'lodash/find'
import indexOf from 'lodash/indexOf'
import isEmpty from 'lodash/isEmpty'
import isObject from 'lodash/isObject'
import map from 'lodash/map'

import { Checkbox } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'

import { areEqual } from '@britania-crm/utils/memo'
import CloseIconButton from '@britania-crm/web-components/IconButton/CloseIconButton'

import TextField from '../TextField'
import useStyles from './styles'

const InputSelectStyled = forwardRef(
  (
    {
      iconAdornment,
      native,
      options,
      idKey,
      valueKey,
      loading,
      clearable,
      InputProps,
      value,
      onChange,
      multiple,
      ...props
    },
    fieldRef
  ) => {
    const classes = useStyles()

    const EndAdornment = useMemo(
      () =>
        (loading || clearable) && (
          <>
            {InputProps?.endAdornment || null}

            <InputAdornment style={{ marginRight: 12 }} position='end'>
              {clearable && value && (
                <CloseIconButton
                  size='small'
                  onClick={() =>
                    onChange({ target: { value: multiple ? [] : null } })
                  }
                />
              )}
              {loading && (
                <CircularProgress disableShrink color='inherit' size={20} />
              )}
            </InputAdornment>
          </>
        ),
      [InputProps.endAdornment, clearable, loading, multiple, onChange, value]
    )

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
            {multiple && (
              <Checkbox
                classes={{ root: classes.checkbox }}
                checked={indexOf(value, id) > -1}
                size='small'
              />
            )}
            {name}
          </MenuItem>
        )
      })
    }, [options, idKey, valueKey, classes, multiple, value])

    const transformRender = useCallback(
      (value) => (isObject(value) ? value[valueKey] : value || ''),
      [valueKey]
    )

    const rederSelectedValues = useCallback(
      (value) => {
        if (multiple) {
          return map(
            value,
            (item) =>
              find(options, (option) => option[idKey] === item)?.[valueKey]
          ).join(', ')
        } else {
          return find(options, (option) => option[idKey] === value)?.[valueKey]
        }
      },
      [idKey, multiple, options, valueKey]
    )

    return (
      <TextField
        ref={fieldRef}
        detached
        select
        InputProps={{
          ...InputProps,
          endAdornment: EndAdornment
        }}
        transformRender={transformRender}
        SelectProps={{
          native,
          onChange,
          multiple,
          value,
          renderValue: rederSelectedValues,
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
        value={value}
        theme={{
          overrides: {
            MuiMenu: {
              paper: {
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                paddingLeft: 16,
                paddingRight: 16
              },
              list: { padding: 0 }
            }
          }
        }}
        {...props}
        style={{ fontSize: 15 }}
      >
        {renderedOptions}
      </TextField>
    )
  }
)

InputSelectStyled.propTypes = {
  label: PropTypes.any,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  iconAdornment: PropTypes.element,
  native: PropTypes.bool,
  options: PropTypes.array,
  idKey: PropTypes.string,
  valueKey: PropTypes.string,
  loading: PropTypes.bool,
  clearable: PropTypes.bool,
  InputProps: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool
}

InputSelectStyled.defaultProps = {
  label: null,
  required: false,
  error: undefined,
  helperText: null,
  iconAdornment: null,
  native: false,
  options: [],
  idKey: 'id',
  valueKey: 'name',
  loading: false,
  InputProps: {},
  clearable: false,
  value: '',
  onChange() {},
  multiple: false
}

export default memo(InputSelectStyled, areEqual)
