import type { CredentialType } from '../types/'
import jwtDecode, { JwtPayload } from 'jwt-decode'

export const baseUrl = 'https://xm-crm-react-exercise-server.herokuapp.com'

export const auth = async (data: CredentialType) => {
  const url = `${baseUrl}/login`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return res.status === 200 ? res.json() : Promise.reject(await res.json())
}

export const fetchIngredients = async () => {
  const url = `${baseUrl}/ingredients`
  const token = getToken()

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.json()
}

export const setToken = (token: string) => token && localStorage.setItem('token', token)
export const getToken = () => localStorage.getItem('token')
export const isTokenValid = () => {
  const token = getToken()

  if (!token) return false

  const decoded = jwtDecode<JwtPayload>(token)
  const now = Math.floor(new Date().getTime() / 1000) // align the unix timestamp with server
  const exp = decoded.exp || 0

  return now <= exp
}
