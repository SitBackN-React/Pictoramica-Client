import axios from 'axios'
import apiUrl from '../../apiConfig'

export default axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json'
  }
})
