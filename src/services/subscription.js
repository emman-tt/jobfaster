import { api } from '../libs/axios'

export async function getSubscription() {
  const res = await api.get('/subscription')
  return res.data.data
}
