let token = null

export const getToken = () => token
export const setToken = newToken => {
  token = newToken
}
export const clearToken = () => {
  token = null
}
