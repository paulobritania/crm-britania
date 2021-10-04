import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import permissionExceptionsSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/profile/permissionExceptions.schema'
import I18n, { useT } from '@britania-crm/i18n'
import Badges from '@britania-crm/web-components/Badges'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputSelect from '@britania-crm/web-components/InputSelect'
import Modal from '@britania-crm/web-components/Modal'

import useStyles, { TitleItem } from '../styles'

const PermissionExceptionsModal = ({
  id,
  open,
  handleClose,
  permissions,
  exceptionsList,
  access,
  onSave,
  isEdit
}) => {
  const classes = useStyles()
  const t = useT()
  const formRef = useRef(null)

  const [mounted, setMounted] = useState(false)

  const filterOptions = useMemo(
    () => {
      const existingAccess = map(exceptionsList, ({ access }) => access)
      return filter(access, (item) => !find(existingAccess, ({ id }) => id === item.id))
    },
    [access, exceptionsList]
  )

  const handleSubmit = useCallback(
    (values) => {
      onSave({
        access: find(access, (item) => (item.id === values.accessId)),
        permission: values.permissions
      })
      handleClose()
    },
    [access, handleClose, onSave]
  )

  useEffect(() => {
    if (mounted && isEdit) {
      formRef.current.setData({
        permissions,
        accessId: access?.[0]?.id
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, permissions, mounted])

  useEffect(() => {
    if (mounted && !isEdit) {
      formRef.current.setFieldValue('accessId', filterOptions?.[0]?.id)
    }
  }, [filterOptions, isEdit, mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('permission exception') }
      maxWidth="sm"
      fullWidth
      FooterComponent={ () => (
        <Grid container alignItems="center" justify="center" spacing={ 2 } className={ classes.buttons }>
          <I18n as={ Button }
            color="secondary"
            onClick={ handleClose }
            size="small"
            variant="outlined"
            width="200px"
          >
            cancel
          </I18n>
          <I18n as={ Button }
            color="secondary"
            onClick={ () => formRef.current.submit() }
            size="small"
            variant="contained"
            width="200px"
          >
            save
          </I18n>
        </Grid>
      ) }
    >
      <Form
        ref={ formRef }
        schemaConstructor={ permissionExceptionsSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container spacing={ 2 }>
          <Grid item xs={ 7 }>
            <InputSelect
              name="accessId"
              label="Menu para visualização Micro"
              options={ filterOptions }
              disabled={ isEdit }
            />
          </Grid>
          <Grid container item xs={ 12 }>
            <Grid item >
              <I18n as={ TitleItem } params={ { howMany: 2 } }>permission</I18n>
            </Grid>
            <Grid item >
              <Badges
                name="permissions"
                options={ permissions }
              />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

PermissionExceptionsModal.propTypes = {
  handleClose: PropTypes.func,
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  permissions: PropTypes.array,
  access: PropTypes.array,
  onSave: PropTypes.func,
  isEdit: PropTypes.bool,
  exceptionsList: PropTypes.array
}

PermissionExceptionsModal.defaultProps = {
  access: [],
  permissions: [],
  onSave () {},
  handleClose () {},
  isEdit: false,
  exceptionsList: []
}

export default PermissionExceptionsModal
