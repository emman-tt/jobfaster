import { api } from '../libs/axios'

export async function getActivity (page = 1, limit = 20) {
  const response = await api.get(`/activity?page=${page}&limit=${limit}`)
  return response.data
}
