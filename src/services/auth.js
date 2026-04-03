import { api } from '../libs/axios'
export async function register (name, password, email) {
  try {
    const res = await api.post('/auth/register', {
      name: name,
      password: password,
      email: email
    })

    const response = await res.data
    return response
  } catch (error) {
    console.log(error)
    const errorStatus = error?.response?.status
    return errorStatus
  }
}





export async function login (password, email) {
  try {
    const res = await api.post('/auth/login', {
      password: password,
      email: email
    })

    const response = await res.data
    return response
  } catch (error) {
    console.log(error)
    const errorStatus = error?.response?.status
    return errorStatus
  }
}
