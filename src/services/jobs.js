import { api } from '../libs/axios'

export async function getJobs () {
  const res = await api.get('/job')
  return res.data.data
}
