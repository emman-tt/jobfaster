import { api } from '../libs/axios'

export async function tailorResume ( data ) {
  try {
    const resumeData = data
    console.log(resumeData)
    const res = await api.post('/ai/tailor/resume', resumeData)
    const response = res.data
    return response
  } catch (error) {
    console.log(error)
  }
}
