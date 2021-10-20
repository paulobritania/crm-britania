import React, {
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import colors from '@britania-crm/styles/colors'

const EditableSelect = ({ props }) => {
  const {
    columnEditable,
    value: initialValue,
    row: { index },
    column,
    column: { id },
    updateMyData
  } = props

  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback((e) => {
    setValue(e.target.value)
  }, [])

  // We'll only update the external data when the input is blurred
  const handleBlur = useCallback(() => {
    updateMyData(index, id, value)
  }, [id, index, updateMyData, value])

  return (
    <>
      {columnEditable !== column.parent.id ? (
        <div style={ { minWidth: '44px' } }></div>
      )
        : <FormControl
          style={ {
            border: `1px solid ${ colors.britPrimary1.lighter }`,
            borderRadius: 5,
            background: colors.white2
          } }
        >
          <Select
            labelId="simple-select"
            id="simple-select"
            value={ value }
            onChange={ handleChange }
            onBlur={ handleBlur }
            disableUnderline
          >
            <MenuItem value="<">{'<'}</MenuItem>
            <MenuItem value=">">{ '>' }</MenuItem>
            <MenuItem value="=">{ '=' }</MenuItem>
            <MenuItem value="<=">{ '<=' }</MenuItem>
            <MenuItem value=">=">{ '>=' }</MenuItem>
          </Select>
        </FormControl>
      }
    </>

  )
}

EditableSelect.propTypes = {
  columnEditable: PropTypes.string,
  props: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  updateMyData: PropTypes.object.isRequired
}

EditableSelect.defaultProps = { columnEditable: '' }

export default EditableSelect
