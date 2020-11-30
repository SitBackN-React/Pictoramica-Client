import http from './http-common'
import apiUrl from '../../apiConfig'

const upload = (file, onUploadProgress) => {
  const formData = new FormData()

  formData.append('file', file)

  return http.post(`${apiUrl}/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  })
}

export default {
  upload
}
