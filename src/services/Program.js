import { api } from '../libs/axios'

const base = 'program'

export async function deleteProgram (id) {
  const response = await api.delete(`/${base}/${id}`, {
    timeout: 50000
  })
  const raw = await response.data
  return raw
}
export async function UploadFolder (name) {
  const response = await api.post(`/${base}/folder/${name}`, {
    timeout: 50000
  })
  const raw = await response.data
  return raw
}

export async function UploadFile (formData) {
  const response = await api.post(`/${base}/file`, formData, {
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

export async function MoveFile (fileId, folderId) {
  const response = await api.put(`/${base}/file/move`, {
    fileId,
    folderId
  })
  return response.data
}
