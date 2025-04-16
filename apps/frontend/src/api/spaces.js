import api from './axios'

export async function getSpaces() {
  const response = await api.get('/spaces')
  return response.data
}

export async function getSpaceById(id) {
  const response = await api.get(`/spaces/${id}`)
  return response.data
}
