import { api } from '../libs/axios'

const base = 'program'

export async function UploadFolder (name) {
  const response = await api.post(`/${base}/folder/${name}`, {
    timeout: 50000
  })
  const raw = await response.data
  return raw
}

export async function UploadFile (formData) {
  const response = await api.post(`/${base}/resume`, formData, {
    timeout: 50000,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const raw = await response.data
  return raw
}

export async function FetchPrograms () {
  const response = await api.get(`/${base}`, {
    timeout: 20000
  })
  return response.data
}
