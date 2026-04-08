import { api } from '../libs/axios'

export async function register (name, password, email) {
  const controller = new AbortController()
  try {
    const res = await api.post(
      '/auth/register',
      {
        name: name,
        password: password,
        email: email
      },
      { signal: controller.signal }
    )

    const response = await res.data
    return response
  } catch (error) {
    console.log(error)
    const errorStatus = error?.response?.status
    return errorStatus
  }
}

export async function login (password, email) {
  const controller = new AbortController()

  try {
    const res = await api.post(
      '/auth/login',
      {
        password: password,
        email: email
      },
      {
        signal: controller.signal
      }
    )

    const response = await res.data
    return response
  } catch (error) {
    const err = error.response.data
    return {
      statusCode: error.response.status,
      status: err.status,
      message: err.message
    }
  }
}
