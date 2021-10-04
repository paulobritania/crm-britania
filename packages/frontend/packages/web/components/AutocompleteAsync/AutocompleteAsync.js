
import React, {
  useEffect,
  useMemo,
  useState
} from 'react'

import PropTypes from 'prop-types'

import { debounce } from 'lodash'

import CircularProgress from '@material-ui/core/CircularProgress'
import IconSearch from '@material-ui/icons/SearchOutlined'
import MuiAutocomplete from '@material-ui/lab/Autocomplete'

// import api from '~/service/api/api'
import { StyledTextField } from './styled'

const AutocompleteAsync = ({
  formik,
  label,
  helperText,
  error,
  name,
  margin,
  mapName,
  modalButton: ModalButton,
  placeholder,
  required,
  onValueSelected,
  minChars = 3,
  value
}) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])

  const smartOptions = useMemo(() => {
    const myOptions = [...options]

    if (ModalButton) {
      myOptions.push({ isBottomComponent: true })
    }

    return myOptions
  }, [ModalButton, options])

  const search = debounce(async (keyword) => {
    if (keyword.length < minChars) return
    setLoading(true)

    // mock temp
    const { data } = { data: [{ name: 'Geraldo' }, { name: 'Maria' }] } // await api.get(url.replace('{search}', keyword))

    if (mapName) {
      setOptions(data.map((item) => ({ ...item, name: item[mapName] })))
    } else {
      setOptions(data)
    }

    setLoading(false)
  }, 1000)

  useEffect(() => {
    if (!open || !value) {
      setOptions([])
    }
  }, [open, value])

  return (
    <MuiAutocomplete
      name={ name }
      id={ name }
      style={ { width: '100%' } }
      onClose={ () => setOpen(false) }
      options={ smartOptions }
      getOptionLabel={ (option) => option.name || '' }
      getOptionSelected={ (option, value) => option.name === value.name }
      filterOptions={ (allOptions) => allOptions }
      loading={ loading }
      noOptionsText=""
      margin={ margin }
      value={ value }
      onChange={ (e, value) => {
        if (value && typeof onValueSelected === 'function') {
          onValueSelected(value)
        }

        if (formik) {
          formik.setFieldValue(name, value?.id || '')
        }
      } }
      renderInput={ (params) => (
        <StyledTextField
          { ...params }
          required={ required }
          name={ name }
          margin={ margin }
          variant="filled"
          error={ error }
          helperText={ helperText }
          onBlur={ formik && formik.handleBlur }
          onChange={ (e) => search(e.target.value) }
          placeholder={ placeholder }
          label={ label }
          InputProps={ {
            ...params.InputProps,
            disableUnderline: true,
            startAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={ 20 } /> : null}
                <IconSearch />
              </>
            )
          } }
        />
      ) }
      renderOption={ (option) => {
        if (ModalButton && option.isBottomComponent) {
          return <ModalButton />
        }
        return <span>{option.name}</span>
      } }
    />
  )
}

AutocompleteAsync.propTypes = {
  formik: PropTypes.object,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  margin: PropTypes.number,
  mapName: PropTypes.string,
  modalButton: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  required: PropTypes.bool,
  onValueSelected: PropTypes.func,
  minChars: PropTypes.number,
  url: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string
}

AutocompleteAsync.defaultProps = {
  error: undefined,
  formik: undefined,
  helperText: '',
  label: '',
  margin: undefined,
  placeholder: '',
  modalButton: () => null,
  required: false,
  onValueSelected () {},
  minChars: 0,
  mapName: undefined,
  value: ''
}

export default AutocompleteAsync
