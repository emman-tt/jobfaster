import { api } from '../libs/axios'

export default async function Upload (formData) {
  try {
    const response = await api.post('/file/resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const raw = response.data.data.aiResponse
    const result = JSON.parse(raw)
    console.log(result)

    return result
  } catch (error) {
    console.log(error)
  }
}
