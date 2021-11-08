import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  memo
} from 'react'

import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'

import Autocomplete from '@material-ui/lab/Autocomplete'
import { InputAdornment, CircularProgress, InputLabel } from '@material-ui/core'

import { Controller } from 'react-hook-form'

import crmApi from '@britania-crm/services/apis/crmApi'
import { areEqual } from '@britania-crm/utils/memo'
import IconButton from '@britania-crm/web-components/IconButton'
import SearchIconButton from '@britania-crm/web-components/IconButton/SearchIconButton'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import Tooltip from '@britania-crm/web-components/Tooltip'

import { InputTextStyled } from './styles'

const AutocompleteStyled = ({
  name,
  control,
  theme,
  api,
  url,
  label,
  normalizeDataFn,
  noOptionsText,
  loadingText,
  required,
  paramName,
  params,
  value,
  valueKey,
  disabled,
  options: optionsProp,
  loading: externalLoading,
  infoDescription,
  variant,
  placeholder,
  ...rest
}) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const query = useRef('')
  const [internalLoading, setLoading] = useState(false)

  const loading = useMemo(
    () => internalLoading || externalLoading,
    [externalLoading, internalLoading]
  )

  const updateList = useCallback(
    debounce(async () => {
      if (url) {
        try {
          setLoading(true)
          let newParams = params
          if (query.current) {
            newParams = { [paramName]: query.current, ...params }
          }
          const response = await api.get(url, { params: newParams })
          setOptions(normalizeDataFn(response?.data))
        } finally {
          setLoading(false)
        }
      }
    }, 300),
    [api, normalizeDataFn, paramName, params, query, url]
  )

  const onInputChange = useCallback(
    (event, value, reason) => {
      if (reason === 'input') {
        if (size(value) > 2) {
          query.current = value
          updateList()
        } else {
          query.current = ''
          setOptions([])
        }
      }
    },
    [updateList]
  )

  const handleClickSearch = useCallback(
    debounce(() => {
      updateList()
      setOpen(true)
    }, 200),
    [url]
  )

  useEffect(() => {
    if (!url) {
      setOptions(optionsProp)
    }
  }, [optionsProp, url])

  useEffect(() => {
    if (url && !isEmpty(value) && isEmpty(options)) {
      query.current = value.name
      updateList()
    }
    return updateList.cancel
  }, [query, updateList, url, value])

  return (
    <>
      <InputLabel style={{ margin: '5px auto', color: '#1F2D3D' }}>
        {label}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true)
            }}
            onClose={() => {
              setOpen(false)
            }}
            disabled={disabled}
            getOptionSelected={(option, value) =>
              option[valueKey] === value[valueKey]
            }
            getOptionLabel={(option) =>
              option[valueKey] ? option[valueKey].toString() : ''
            }
            onInputChange={onInputChange}
            onChange={(_, data) => onChange(data)}
            options={options}
            loading={loading}
            noOptionsText={noOptionsText}
            loadingText={loadingText}
            value={value}
            renderInput={(params) => (
              <InputTextStyled
                {...params}
                {...rest}
                disabled={disabled}
                required={required}
                variant={variant}
                type='input'
                style={{ display: 'flex' }}
                InputProps={{
                  ...params.InputProps,
                  placeholder: placeholder,
                  endAdornment: (
                    <InputAdornment position='end'>
                      {loading && (
                        <CircularProgress color='inherit' size={18} />
                      )}
                      {!disabled && (
                        <SearchIconButton
                          color='secondary'
                          onClick={handleClickSearch}
                        />
                      )}
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        )}
      />
      {infoDescription && (
        <Tooltip title={infoDescription} arrow>
          <IconButton color='care'>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

AutocompleteStyled.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string.isRequired,
  normalizeDataFn: PropTypes.func,
  noOptionsText: PropTypes.string,
  loadingText: PropTypes.string,
  paramName: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.object,
  valueKey: PropTypes.string,
  options: PropTypes.array,
  api: PropTypes.any,
  params: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  infoDescription: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string
}

AutocompleteStyled.defaultProps = {
  type: 'text',
  noOptionsText: 'Sem opções',
  loadingText: 'Carregando...',
  normalizeDataFn: (d) => d,
  required: false,
  value: {},
  valueKey: 'name',
  url: '',
  options: [],
  api: crmApi,
  paramName: 'name',
  params: {},
  loading: false,
  disabled: false,
  infoDescription: '',
  variant: 'outlined',
  placeholder: ''
}

export default memo(AutocompleteStyled, areEqual)
