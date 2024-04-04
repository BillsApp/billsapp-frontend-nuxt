import axiosIns from './axios'

const $http = axiosIns

interface AuthPayload {
  email: string,
  password: string
}

export const $getToken = async (payload: AuthPayload) => {
  return $http.post('auth/token/login/', payload)
}

export const $getMe = async () => {
  return $http.get('auth/users/me/')
}
