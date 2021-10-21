import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react'
import { useDispatch } from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import debounce from 'lodash/debounce'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import uniqWith from 'lodash/uniqWith'

import { useDialog } from '@britania-crm/dialog'
import profileSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/profile/profile.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  users as usersCrmRoutes,
  access as accessCrmRoutes,
  permissions as permissionsCrmRoutes,
  profiles as profilesCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { ProfilesActions } from '@britania-crm/stores/profiles/'
import { colors } from '@britania-crm/styles'
import Badges from '@britania-crm/web-components/Badges'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import MicroViewIcon from '@britania-crm/web-components/Icons/MicroViewIcon'
import PermissionExceptionIcon from '@britania-crm/web-components/Icons/PermissionExceptionIcon'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputText from '@britania-crm/web-components/InputText'
import StatusSwitch from '@britania-crm/web-components/StatusSwitch'
import TransferList from '@britania-crm/web-components/TransferList'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import MicroViewingModal from '../../modals/MicroViewingModal/MicroViewingModal'
import PermissionExceptionsModal from '../../modals/PermissionExceptionsModal/PermissionExceptionsModal'
import MicroViewingTable from '../../tables/MicroViewingTable/MicroViewingTable'
import PermissionExceptionsTable from '../../tables/PermissionExceptionsTable/PermissionExceptionsTable'
import useStyles, {
  Grid,
  Container,
  Footer
} from './styles'

const ProfileFormScreen = () => {
  const t = useT()
  const { createDialog } = useDialog()
  const classes = useStyles()
  const dispatch = useCallback(useDispatch(), [])

  const history = useHistory()
  const { state } = useLocation()
  const { routes, currentRoutePermissions } = useRoutes()

  const formRef = useRef(null)

  const [mounted, setMounted] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [accessesSelected, setAccessesSelected] = useState([])
  const [microsSelected, setMicrosSelected] = useState([])
  const [permissionsSelected, setPermissionsSelected] = useState([])
  const [exceptionsSelected, setExceptionsSelected] = useState([])
  const [queryParams, setQueryParams] = useState({ name: '' })

  const { data: usersFromApi, loading: userFromApiLoading } = useCrmApi([usersCrmRoutes.list, queryParams], { params: queryParams })
  const { data: permissionFromApi } = useCrmApi(permissionsCrmRoutes.base)
  const { data: viewsListFromApi } = useCrmApi(accessCrmRoutes.getAll)
  const { data: profilesFromApi } = useCrmApi(state?.profileId ? [`${ profilesCrmRoutes.list }/${ state.profileId }`, state] : null)

  const loading = useMemo(
    () => userFromApiLoading || submitLoading,
    [submitLoading, userFromApiLoading]
  )

  const viewsListOptions = useMemo(
    () => map(viewsListFromApi, (option) => ({
      id: option.id,
      name: option.name
    })),
    [viewsListFromApi]
  )

  const permissionsOptions = useMemo(
    () => map(permissionFromApi, (option) => ({
      id: option.id,
      name: option.name
    })),
    [permissionFromApi]
  )

  const usersOptions = useMemo(
    () => map(usersFromApi, (option) => ({
      id: option.id,
      name: option.username
    }))
    , [usersFromApi]
  )

  const formatMicroViewList = useMemo(() => {
    const arrayhiddenFields = map(profilesFromApi?.micros, ({ field }) => ({
      id: field.id,
      name: field.name,
      accessId: field.accessId
    }
    ))

    const arrayAccess = map(profilesFromApi?.micros, ({ field }) => ({
      access: { id: field.access.id, name: field.access.name },
      hiddenFields: filter(arrayhiddenFields, { accessId: field.accessId })
    }))

    return uniqWith(arrayAccess, isEqual)
  }, [profilesFromApi])

  const formatExceptionsAndPermissionList = useMemo(() => {
    const permissionArr = map(profilesFromApi?.exceptions, (item) => ({
      id: item.permission.id,
      name: item.permission.name,
      accessId: item.accessId
    }))

    const accessArr = map(profilesFromApi?.exceptions, ({
      access,
      accessId
    }) => ({
      access: { id: access.id, name: access.name },
      permission: filter(permissionArr, { accessId })
    }))

    return uniqWith(accessArr, isEqual)
  }, [profilesFromApi])

  const handleSubmit = useCallback(
    (values) => {
      const formattedValues = {
        ...values,
        permissions: map(values.permissions, (permission) => permission.id),
        access: map(values.access, (access) => access.id),
        micros: map(values.micros, (micro) => map(micro.hiddenFields, (field) => field.id)).flat(),
        users: map(values.users, (user) => user.userId || user.id),
        exceptions: map(
          values.exceptions,
          ({ access, permission }) => map(permission, (item) => ({
            access: access.id,
            permission: item.id
          }))
        ).flat()
      }

      const onSuccess = () => {
        history.push(routes.profiles.path)
      }

      if (state?.profileId) {
        dispatch(ProfilesActions.editProfile(
          state.profileId,
          formattedValues,
          onSuccess,
          () => setSubmitLoading(false)
        ))
      } else {
        dispatch(ProfilesActions.createProfile(
          formattedValues,
          onSuccess,
          () => setSubmitLoading(false)
        ))
      }
    },
    [dispatch, history, routes.profiles.path, state]
  )

  const handleExceptionsEdit = useCallback(
    (exception) => {
      formRef.current.setFieldValue(
        'exceptions',
        (oldExceptions) => map(oldExceptions, (item) => {
          if (item?.access?.id === exception.access.id) {
            return exception
          }
          return item
        })
      )
    },
    []
  )

  const handleDeleteException = useCallback(
    (exception) => {
      formRef.current.setFieldValue(
        'exceptions',
        (oldExceptions) => filter(oldExceptions, ({ access }) => access.id !== exception.accessId)
      )
    },
    []
  )

  const handleDeleteMicro = useCallback(
    (micro) => {
      formRef.current.setFieldValue(
        'micros',
        (old = []) => filter(old, ({ access }) => access?.id !== micro?.access?.id)
      )
    },
    []
  )

  const handleEditMicro = useCallback(
    (micro) => {
      formRef.current.setFieldValue(
        'micros',
        (old = []) => map(old, (item) => item?.access?.id === micro?.access?.id ? micro : item)
      )
    },
    []
  )

  const debounceQuery = useCallback(
    debounce((filter) => {
      if (filter.length >= 3) {
        setQueryParams({ name: filter })
      }
    }, 300),
    []
  )

  const onFilterChange = useCallback(
    (side, filter) => {
      if (side === 'left') {
        debounceQuery(filter)
      }
    },
    [debounceQuery]
  )

  const handleOpenMicroViewingModal = useCallback(
    () => createDialog({
      id: 'microview-modal',
      Component: MicroViewingModal,
      props: {
        accessesSelected: formRef.current.getFieldValue('access'),
        microViewList: formRef.current.getFieldValue('micros'),
        onSave: (micro) => formRef.current.setFieldValue('micros', (old = []) => [...old, micro])
      }
    }),
    [createDialog]
  )

  const handleOpenPermissionExceptionsModal = useCallback(
    () => createDialog({
      id: 'permission-modal',
      Component: PermissionExceptionsModal,
      props: {
        access: formRef.current.getFieldValue('access'),
        permissions: formRef.current.getFieldValue('permissions'),
        exceptionsList: formRef.current.getFieldValue('exceptions'),
        onSave: (exception) => formRef.current.setFieldValue('exceptions', (old = []) => [...old, exception])
      }
    }),
    [createDialog]
  )

  useEffect(() => {
    if (!isEmpty(profilesFromApi) && mounted) {
      formRef.current.setData({
        ...profilesFromApi,
        permissions: map(profilesFromApi?.permissions, (item) => ({ id: item.permission.id, name: item.permission.name })),
        access: map(profilesFromApi?.accesses, ({ accessId, access }) => ({ id: accessId, name: access.name })),
        micros: formatMicroViewList,
        users: map(profilesFromApi?.userProfile, ({ user }) => ({ id: user.id, name: user.username })),
        exceptions: formatExceptionsAndPermissionList
      })
    } else if (!mounted) {
      setMounted(true)
    }
  }, [profilesFromApi, mounted, formatMicroViewList, formatExceptionsAndPermissionList])

  return (
    <Container>
      <h1>{state?.profileId ? t('edit profile') : t('new profile') }</h1>

      <Form
        ref={ formRef }
        onSubmit={ handleSubmit }
        schemaConstructor={ profileSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container alignItems="center" justify="space-between" spacing={ 2 }>
          <Grid item sm={ 10 }>
            <InputText
              name="name"
              label={ t('profile', { howMany: 1 }) }
              fullWidth
            />
          </Grid>
          <Grid item sm={ 2 }>
            <StatusSwitch
              name="active"
              disabled={ !currentRoutePermissions.INATIVAR }
            />
          </Grid>
        </Grid>

        <Grid container direction="column" className={ classes.grid }>
          <Badges
            name="permissions"
            label={ `${ t('permission', { howMany: 2 }) }:` }
            options={ permissionsOptions }
            onValueChange={ setPermissionsSelected }
          />
        </Grid>

        <Grid className={ classes.grid } container direction="column">
          <Badges
            name="access"
            label={ `${ t('view', { howMany: 2 }) }:` }
            options={ viewsListOptions }
            onValueChange={ setAccessesSelected }
          />
        </Grid>

        <Grid container direction="row" alignItems="center" justify="center" className={ [classes.btn, classes.grid] }>
          <I18n
            as={ Button }
            id="AddMicroViewingButton"
            disabled={ isEmpty(accessesSelected) }
            className={ classes.addMicroView }
            onClick={ handleOpenMicroViewingModal }
            startIcon={ <MicroViewIcon color={ colors.white } /> }
            variant="contained"
            style={ { marginRight: 6 } }
          >
            add micro view
          </I18n>
          <InputHidden name="micros" onValueChange={ setMicrosSelected } />

          <I18n
            as={ Button }
            id="AddPermissionExcetionButton"
            disabled={ isEmpty(accessesSelected) || isEmpty(permissionsSelected) }
            className={ classes.addPermissionException }
            onClick={ handleOpenPermissionExceptionsModal }
            startIcon={ <PermissionExceptionIcon color={ colors.white } /> }
            variant="contained"
            style={ { marginLeft: 6 } }
          >
            add permission exceptions
          </I18n>
          <InputHidden name="exceptions" onValueChange={ setExceptionsSelected } />
        </Grid>

        {!isEmpty(exceptionsSelected) && (
          <Grid className={ classes.grid } container direction="column">
            <PermissionExceptionsTable
              onEdit={ handleExceptionsEdit }
              exceptionsList={ exceptionsSelected }
              onDelete={ handleDeleteException }
            />
          </Grid>
        )}

        {!isEmpty(microsSelected) && (
          <Grid className={ classes.grid } container direction="column">
            <MicroViewingTable
              microViewList={ microsSelected }
              onDelete={ handleDeleteMicro }
              onEdit={ handleEditMicro }
            />
          </Grid>
        )}

        <Grid className={ classes.grid } container direction="column">
          <TransferList
            name="users"
            title={ t('user', { howMany: 2 }) }
            options={ usersOptions }
            loading={ loading }
            onFilterChange={ onFilterChange }
          />
        </Grid>
      </Form>

      <Footer>
        <I18n
          as={ Button }
          onClick={ () => formRef.current.reset() }
          color="secondary"
          variant="text"
          disabled={ loading }
        >
            clean
        </I18n>
        <div>
          <I18n
            as={ Button }
            color="secondary"
            onClick={ () => history.push(routes.profiles.path) }
            size="small"
            variant="outlined"
            width="154px"
            disabled={ loading }
          >
              cancel
          </I18n>
          <I18n
            as={ Button }
            onClick={ () => formRef.current.submit() }
            color="secondary"
            size="small"
            variant="contained"
            width="234px"
            isLoading={ loading }
          >
             finish registration
          </I18n>
        </div>
      </Footer>
    </Container>
  )
}

export default ProfileFormScreen
