import { api } from '../libs/axios'

export async function Upload (formData) {
  try {
    const response = await api.post('/file/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const raw = response.data
    // const result = JSON.parse(raw)
    console.log(raw)

    // return result
  } catch (error) {
    console.log(error)
  }
}
