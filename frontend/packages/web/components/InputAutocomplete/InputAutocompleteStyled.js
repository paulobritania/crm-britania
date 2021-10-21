import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  memo
} from 'react'

import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'

import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import Autocomplete from '@material-ui/lab/Autocomplete'

import crmApi from '@britania-crm/services/apis/crmApi'
import { areEqual } from '@britania-crm/utils/memo'
import IconButton from '@britania-crm/web-components/IconButton'
import SearchIconButton from '@britania-crm/web-components/IconButton/SearchIconButton'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import InputText from '@britania-crm/web-components/InputText'
import Tooltip from '@britania-crm/web-components/Tooltip'

import useStyles from './styles'

const InputAutocompleteStyled = forwardRef(
  (
    {
      api,
      url,
      label,
      normalizeDataFn,
      noOptionsText,
      loadingText,
      onChange,
      required,
      paramName,
      params,
      value,
      valueKey,
      disabled,
      options: optionsProp,
      loading: externalLoading,
      infoDescription,
      ...rest
    },
    fieldRef
  ) => {
    const classes = useStyles()

    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const query = useRef('')
    const [internalLoading, setLoading] = useState(false)

    const loading = useMemo(() => internalLoading || externalLoading, [
      externalLoading,
      internalLoading
    ])

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

    const handleChange = useCallback(
      (event, newValue) => onChange(newValue || {}),
      [onChange]
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

    useEffect(
      () => {
        if (url && !isEmpty(value) && isEmpty(options)) {
          query.current = value.name
          updateList()
        }
        return updateList.cancel
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [query, updateList, url, value]
    )

    return (
      <div className={classes.body}>
        <Autocomplete
          ref={fieldRef}
          classes={{ root: classes.root, input: classes.autocomplete }}
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
          options={options}
          loading={loading}
          onChange={handleChange}
          noOptionsText={noOptionsText}
          loadingText={loadingText}
          value={isEmpty(value) ? null : value}
          renderInput={(params) => (
            <InputText
              {...params}
              {...rest}
              detached
              disabled={disabled}
              name='auto-complete'
              label={label}
              required={required}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position='end'>
                    {loading && <CircularProgress color='inherit' size={18} />}
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
        {infoDescription && (
          <Tooltip title={infoDescription} arrow>
            <IconButton color='care'>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    )
  }
)

InputAutocompleteStyled.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string.isRequired,
  normalizeDataFn: PropTypes.func,
  noOptionsText: PropTypes.string,
  loadingText: PropTypes.string,
  onChange: PropTypes.func,
  paramName: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.object,
  valueKey: PropTypes.string,
  options: PropTypes.array,
  api: PropTypes.any,
  params: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  infoDescription: PropTypes.string
}

InputAutocompleteStyled.defaultProps = {
  type: 'text',
  noOptionsText: 'Sem opções',
  loadingText: 'Carregando...',
  onChange() {},
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
  infoDescription: ''
}

export default memo(InputAutocompleteStyled, areEqual)
