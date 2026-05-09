import { api } from '../libs/axios'

export async function updateProfile (data) {
  const res = await api.patch('settings/profile', {
    data
  })

  return res.data
}
export async function updateNotification (data) {
  const res = await api.patch('settings/notification', {
    data
  })

  return res.data
}
export async function updateActivity (data) {
  const res = await api.patch('settings/activity', {
    data
  })

  return res.data
}
