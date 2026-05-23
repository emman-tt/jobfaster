import { api } from '../libs/axios'

export async function getPlans() {
  const res = await api.get('/plans')
  return res.data.data
}
