import api from './axios'

export async function getUserReservations() {
  const response = await api.get('/reservations')
  return response.data
}

export async function createReservation(data) {
  const response = await api.post('/reservations', data)
  return response.data
}

export async function deleteReservation(id) {
  const response = await api.delete(`/reservations/${id}`)
  return response.data
}

export async function getPendingReservations() {
  const response = await api.get('/reservations/pending')
  return response.data
}

export async function approveReservation(id) {
  const response = await api.patch(`/reservations/${id}/approve`)
  return response.data
}

export async function rejectReservation(id) {
  const response = await api.patch(`/reservations/${id}/reject`)
  return response.data
}
