import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  createContext,
  useRef,
  useContext
} from 'react'
import { useDispatch } from 'react-redux'

import { CancelToken } from 'axios'
import PropTypes from 'prop-types'

import {
  MSG025,
  MSG020,
  MSG018
} from '@britania-crm/constants/feedbackMessages.constants'
import { AppActions } from '@britania-crm/stores/app'
import imageLogin from '@britania-crm/styles/assets/images/default_login_bg.png'

const FileContext = createContext()

const useFile = () => useContext(FileContext)

const FileProvider = ({
  children,
  onSuccess,
  onError,
  uploadFile,
  deleteFile,
  getFile,
  makeUpload,
  makeDelete,
  handleClose,
  hasFile: externalHasFile,
  isPreview,
  defaultImage
}) => {
  const dispatch = useCallback(useDispatch(), [])

  const [uploadedFile, setUploadedFile] = useState({})
  const [hasFile, setHasFile] = useState(false)

  const cancelFileUpload = useRef(null)

  // Função auxiliar para atualizar o estado do arquivo
  const updateFile = useCallback(
    (data) => setUploadedFile((prevState) => ({ ...prevState, ...data })),
    []
  )

  // Função para cancelamento do upload
  const cancelUpload = useCallback(
    () => {
      if (cancelFileUpload.current) {
        updateFile({
          preview: '',
          ready: true,
          uploadedFile: false,
          uploading: false,
          error: true
        })

        cancelFileUpload.current('User has canceled the file upload.')
      }
    },
    [updateFile]
  )

  /**
   * Essa função é responsável por processar cada arquivo que está sendo enviado pelo usuário,
   * chamando a API e fazendo um POST
   *  */
  const processUpload = useCallback(
    async (uploadedFile) => {
      // Criando um FormData que armazena a imagem (arquivo)
      const data = new window.FormData()

      if (uploadedFile.file) {
        data.append('file', uploadedFile?.file)
      }

      /**
       * Objeto contendo a lógica para realizar o acompanhamento/progresso do uploado do arquivo.
       * Além disso contém a operação de cancelamento de upload
       */
      const options = {
        onUploadProgress (progressEvent) {
          const { loaded, total } = progressEvent
          const progress = Math.floor((loaded * 100) / total)

          updateFile({ progress, uploading: true })
        },
        cancelToken: new CancelToken(
          (cancel) => (cancelFileUpload.current = cancel)
        )
      }

      try {
        await uploadFile(data, options)

        updateFile({
          uploaded: true,
          uploading: false
        })

        onSuccess(MSG020)
      } catch (err) {
        console.error(err)

        updateFile({ error: true })

        onError(MSG018)
      }
    },
    [onError, onSuccess, updateFile, uploadFile]
  )

  // Função que lida com os arquivos que foram recebidos
  const handleUpload = useCallback(
    (newFile) => {
      const files = newFile?.target ? newFile.target.files : newFile
      const defaultTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

      if (!defaultTypes.includes(files[0].type)) {
        dispatch(AppActions.addAlert({
          type: 'error',
          message: MSG025
        }))
        return
      }

      const newUploadedFile = {
        file: files[0],
        preview: URL.createObjectURL(files[0]),
        progress: 0,
        uploaded: false,
        uploading: false,
        error: false
      }

      setUploadedFile(newUploadedFile)
      setHasFile(true)
      isPreview(true)
    },
    [dispatch, isPreview]
  )

  const getFileFromApi = useCallback(
    async () => {
      try {
        const response = await getFile()
        if (response.size > 0) {
          const formattedResponse = {
            preview: URL.createObjectURL(response),
            uploaded: true,
            error: false,
            ready: true
          }

          setHasFile(true)
          isPreview(false)
          updateFile(formattedResponse)
        } else {
          updateFile({
            preview: defaultImage,
            uploaded: false,
            error: false,
            ready: true
          })
          setHasFile(false)
          isPreview(false)
        }
      } catch (err) {
        onError(MSG018)
        updateFile({
          preview: defaultImage,
          uploaded: false,
          error: false,
          ready: true
        })
        setHasFile(false)
        isPreview(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getFile, onError, updateFile]
  )

  /**
    * Esse useEffect é responsável por pegar alterações em makeUpload e iniciar uma chamada a API
    * para atualizar a imagem
    */
  useEffect(() => {
    if (!makeUpload) return

    const startProcessUpload = async () => {
      await processUpload(uploadedFile)
      handleClose()
      dispatch(AppActions.addAlert({
        type: 'success',
        message: MSG020
      }))
    }

    startProcessUpload()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeUpload])

  useEffect(() => () => {
    cancelUpload()
    URL.revokeObjectURL(uploadedFile.preview)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
    * Esse useEffect é responsável por pegar alterações em makeDelete, iniciar uma chamada a API
    * para remover a imagem
    */
  useEffect(() => {
    if (!makeDelete) return

    const startProcessDelete = async () => {
      await deleteFile()
      handleClose()
      dispatch(AppActions.addAlert({
        type: 'success',
        message: MSG020
      }))
    }

    startProcessDelete()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeDelete])

  /**
    * Esse useEffect é responsável por pegar alterações em showsDefault, atualizando
    * a exibição de imagem para a imagem default
    */
  useEffect(() => {
    getFileFromApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => {
      externalHasFile(hasFile)
    },
    [externalHasFile, hasFile]
  )

  const value = useMemo(
    () => ({
      uploadedFile,
      handleUpload,
      cancelUpload,
      updateFile,
      hasFile
    }),
    [cancelUpload, handleUpload, hasFile, updateFile, uploadedFile]
  )

  return (
    <FileContext.Provider value={ value }>
      {children}
    </FileContext.Provider>
  )
}

FileProvider.propTypes = {
  children: PropTypes.any.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func,
  getFile: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  hasFile: PropTypes.func,
  isPreview: PropTypes.func,
  makeUpload: PropTypes.bool,
  makeDelete: PropTypes.bool,
  defaultImage: PropTypes.any
}

FileProvider.defaultProps = {
  onSuccess () {},
  onError () {},
  handleClose () {},
  hasFile () {},
  isPreview () {},
  deleteFile () {},
  makeUpload: false,
  makeDelete: false,
  defaultImage: imageLogin
}

export {
  FileProvider,
  useFile
}
