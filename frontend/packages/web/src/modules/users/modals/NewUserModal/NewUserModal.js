import React, {
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import { useDialog } from '@britania-crm/dialog'
import { useFormEffect } from '@britania-crm/forms'
import userSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/user/user.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { users } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { FileActions } from '@britania-crm/stores/file'
import { UsersActions } from '@britania-crm/stores/users'
import ImgProfilePlaceholder from '@britania-crm/styles/assets/images/profile_avatar_default.png'
import {
  formatBackDateTimeToBackDateFormat,
  formatBackDateToIsoFormat
} from '@britania-crm/utils/date'
import { trimMask } from '@britania-crm/utils/formatters'
import AssociatedDataList from '@britania-crm/web-components/AssociatedDataList'
import Button from '@britania-crm/web-components/Button'
import Checkbox from '@britania-crm/web-components/Checkbox'
import Form from '@britania-crm/web-components/Form'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputEmail from '@britania-crm/web-components/InputEmail'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'
import UploadImage from '@britania-crm/web-components/UploadImage'

import LinkRepresentativeModal from '../LinkRepresentativeModal'
import LinkUserProfileModal from '../LinkUserProfileModal'
import {
  Grid,
  ImgContainer
} from '../styles'
import {
  InfoContainer,
  useStyles,
  ShadowBox,
  ContentBox
} from './styles'

const NewUserModal = (props) => {
  const {
    id,
    open,
    handleClose,
    userId,
    onSuccess
  } = props

  const classes = useStyles()
  const t = useT()

  const formRef = useRef(null)

  const [submitLoading, setSubmitLoading] = useState(false)
  const [representativeCodes, setRepresentativeCodes] = useState()
  const [substituteUserId, setSubstituteUserId] = useState()

  const { createDialog } = useDialog()
  const dispatch = useCallback(useDispatch(), [])

  const {
    data: userFromApi,
    loading: userFromApiLoading
  } = useCrmApi(
    userId ? [`${ users.get }/${ userId }`, userId] : null,
    {},
    { revalidateOnFocus: false }
  )

  const loading = useMemo(
    () => userFromApiLoading || submitLoading,
    [submitLoading, userFromApiLoading]
  )

  const createMode = useMemo(() => isEmpty(userFromApi), [userFromApi])

  const handleSubmit = useCallback(
    (values) => {
      setSubmitLoading(true)
      const saveUser = (imageId) => {
        const payload = {
          ...values,
          ...userFromApi,
          id: userId,
          phone: trimMask(values.phone || ''),
          substituteUserId: !!values.substituteUserId?.id && !!values.substituteUserPeriod?.from && !!values.substituteUserPeriod?.to ? values.substituteUserId?.id : null,
          profiles: map(values.profiles, (item) => item.id),
          representativeCodes: map(values.representativeCodes, (item) => item.code),
          substituteUserStartDate: values.substituteUserPeriod.from ? formatBackDateToIsoFormat(values.substituteUserPeriod?.from) : undefined,
          substituteUserEndDate: values.substituteUserPeriod?.to ? formatBackDateToIsoFormat(values.substituteUserPeriod?.to) : undefined,
          imageId: imageId === null ? userFromApi.imageId?.id : imageId
        }

        dispatch(UsersActions.saveUser(
          payload,
          () => {
            onSuccess()
            handleClose()
            setSubmitLoading(false)
          },
          () => setSubmitLoading(false)
        ))
      }

      if (values.imageFile?.size) {
        dispatch(FileActions.uploadImage(
          values.imageFile,
          saveUser,
          () => setSubmitLoading(false)
        ))
      } else {
        saveUser()
      }
    },
    [dispatch, handleClose, onSuccess, userFromApi, userId]
  )

  const handleOpenLinkUserProfileModal = useCallback(() => {
    createDialog({
      id: 'link-user-profile-modal',
      Component: LinkUserProfileModal,
      props: {
        initialProfiles: formRef.current.getFieldValue('profiles'),
        onSave (profiles, onSuccess) {
          formRef.current.setFieldValue('profiles', profiles)
          onSuccess()
        },
        username: formRef.current.getFieldValue('username')
      }
    })
  }, [createDialog])

  const handleOpenLinkRepresentativeModal = useCallback(
    () => {
      createDialog({
        id: 'link-user-representative-modal',
        Component: LinkRepresentativeModal,
        props: {
          initialRepresentatives: formRef.current.getFieldValue('representativeCodes'),
          username: formRef.current.getFieldValue('username'),
          onSave (representatives) {
            formRef.current.setFieldValue('representativeCodes', representatives)
          }
        }
      })
    },
    [createDialog]
  )

  const handleSubstituteUserIdChange = useCallback(
    (value) => {
      setSubstituteUserId(value)
      formRef.current.reloadSchema({ callback: formRef.current.validateField('substituteUserPeriod') })
    },
    []
  )

  useFormEffect(() => {
    if (!isEmpty(userFromApi)) {
      formRef.current.setData({
        ...userFromApi,
        imageFile: !isEmpty(userFromApi.file) ? userFromApi.file : ImgProfilePlaceholder,
        substituteUserId: isEmpty(userFromApi.substituteUser) ? {} : {
          id: userFromApi.substituteUser.id,
          name: userFromApi.substituteUser.username
        },
        substituteUserPeriod: {
          from: userFromApi.substituteUserStartDate ? formatBackDateTimeToBackDateFormat(userFromApi.substituteUserStartDate, 0) : '',
          to: userFromApi.substituteUserEndDate ? formatBackDateTimeToBackDateFormat(userFromApi.substituteUserEndDate, 0) : ''
        },
        profiles: map(
          userFromApi.userProfiles,
          ({ profileId, ...profile }) => ({ id: profileId, ...profile })
        )
      })
    }
  }, [userFromApi])

  return (
    <Modal
      variant="space"
      id={ id }
      open={ open }
      title={ createMode
        ? t('new {this}', { gender: 'male', this: t('user', { howMany: 1 }) })
        : t('editing {this}', { this: t('user', { howMany: 1 }) })
      }
      maxWidth="md"
      fullWidth
      loading={ loading }
      FooterComponent={ () => (
        <>
          <Button
            color="secondary"
            width="200px"
            variant="outlined"
            onClick={ handleClose }
            style={ { marginRight: 10 } }
            disabled={ loading }
          >
            <I18n>cancel</I18n>
          </Button>
          <Button
            color="secondary"
            width="200px"
            variant="contained"
            onClick={ () => formRef.current.submit() }
            disabled={ loading }
          >
            <I18n>save</I18n>
          </Button>
        </>
      ) }
    >
      <Form
        ref={ formRef }
        schemaConstructor={ userSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid container alignItems="center">
          <InputText
            name="username"
            label={ t('user', { howMany: 1 }) }
          />
        </Grid>
        <Grid container alignItems="center" spacing={ 2 }>
          <Grid item xs={ 8 }>
            <InputEmail
              name="email"
              label={ t('email') }
            />
          </Grid>
          <Grid className={ classes.phoneInput } item xs={ 4 }>
            <InputPhone
              name="phone"
              label={ t('phone', { howMany: 1 }) }
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={ 2 }>
          <Grid item xs={ 12 }>
            <Checkbox
              detached
              style={ { marginLeft: 8 } }
              label={ t('link representative', { howMany: 2 }) }
              name="representativeCodesChecked"
              value={ !isEmpty(representativeCodes) }
              onChange={ handleOpenLinkRepresentativeModal }
            />
            <InputHidden name="representativeCodes" onValueChange={ setRepresentativeCodes } />
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="space-between" spacing={ 2 }>
          <Grid item sm={ 8 }>
            <InputAutocomplete
              name="substituteUserId"
              url={ users.autoComplete }
              label={ t('alternate', { howMany: 1 }) }
              fullWidth
              onValueChange={ handleSubstituteUserIdChange }
            />
          </Grid>
          <Grid item sm={ 4 }>
            <InputDateRange
              name="substituteUserPeriod"
              disabled={ isEmpty(substituteUserId) }
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={ 2 }>
          <Grid item xs={ 12 }>
            <Checkbox
              name="customerHierarchyEnabled"
              label={ t('enable all hierarchy clients') }
              style={ { marginLeft: 8 } }
            />
          </Grid>
        </Grid>

        <Grid container justify="center" alignItems="center" direction="column" className={ classes.btnLinkProfile }>
          <I18n
            as={ Button }
            params={ { howMany: 2 } }
            color="warning"
            width="300px"
            variant="contained"
            onClick={ handleOpenLinkUserProfileModal }
            style={ { padding: '0px 80px 0 80px' } }
          >
            link profile
          </I18n>
        </Grid>

        <Grid container alignItems="center" justify="space-between">
          <AssociatedDataList
            name="profiles"
            label={ t('linked profiles') }
          />
        </Grid>

        <ImgContainer>
          <ShadowBox>
            <ContentBox>
              <UploadImage
                name="imageFile"
                preview
                previewStyle={ { width: '300px', height: '300px' } }
                defaultFile={ ImgProfilePlaceholder }
                title={ t('login image add new file message') }
                description={ t('the {this} or', { gender: 'female', this: t('image', { howMany: 1 }) }) }
              />
            </ContentBox>
          </ShadowBox>
          {createMode && (
            <InfoContainer>
              <InfoIcon/>
              A proporção ideal para sua imagem é 1:1
            </InfoContainer>
          )}
        </ImgContainer>

      </Form>
    </Modal>
  )
}

NewUserModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.number,
  onSuccess: PropTypes.func
}

NewUserModal.defaultProps = {
  onSuccess () {},
  userId: undefined
}

export default NewUserModal
