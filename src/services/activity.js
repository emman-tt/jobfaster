import { api } from '../libs/axios'

export async function getActivity () {
  const response = await api.get('/activity')
  return response.data
}
