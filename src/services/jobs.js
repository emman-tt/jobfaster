import { api } from '../libs/axios'

export async function getJobs () {
  const res = await api.get('/job')
  return res.data.data
}

export async function getJobTracks () {
  const res = await api.get('/job/track')
  return res.data
}

export async function saveJobTrack (job) {
  const res = await api.post('/job/track', { job })
  return res.data
}

export async function updateJobTrack (job) {
  const res = await api.patch('/job/track', { job })
  return res.data
}

export async function deleteJobTrack (jobId) {
  const res = await api.delete('/job/track', { params: { jobId } })
  return res.data
}
