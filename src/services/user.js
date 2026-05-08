import { api } from '../libs/axios'

export async function getUser () {
  const res = await api.get('/user')
  return res.data.data
}
