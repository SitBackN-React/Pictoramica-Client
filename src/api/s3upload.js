
import apiUrl from '../apiConfig'
import axios from 'axios'

// S3 upload
export const uploadS3 = (contentType, formData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/post-image',
    headers: {
      'Authorization': `Token token=${user.token}`,
      'Content-Type': contentType
    },
    data: formData
  })
}
