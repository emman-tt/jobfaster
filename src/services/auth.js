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
    const errorStatus = error?.response?.status
    return errorStatus
  }
}

export async function forgotPassword (email) {
  try {
    const res = await api.post('/auth/forgot-password', { email })
    return res.data
  } catch (error) {
    const data = error.response?.data
    return {
      status: 'failed',
      message: data?.message || 'SOMETHING_WRONG'
    }
  }
}

export async function resetPassword (token, password) {
  const res = await api.post('/auth/reset-password', { token, password })
  return res.data
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
