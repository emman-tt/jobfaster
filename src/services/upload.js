import { api } from '../libs/axios'

export async function Upload (formData) {
  try {
    const response = await api.post('/file/resume', formData, {
      timeout: 10000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const raw = await response.data
    return raw
  } catch (error) {
    const err = error.response.data
    return {
      statusCode: error.response.status,
      status: err.status,
      message: err.message
    }
  }
}
