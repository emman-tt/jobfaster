import { api } from '../libs/axios'

export async function Upload (name) {
  const response = await api.post(`/file/folder/${name}`, {
    timeout: 50000
  })
  const raw = await response.data
  return raw
}
