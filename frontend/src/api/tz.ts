import axios from 'axios'
import type { Tz, TzInput } from '../types'

const api = axios.create({ baseURL: '/api' })

export const tzApi = {
  list: () => api.get<Tz[]>('/tz').then(r => r.data),
  get: (id: number) => api.get<Tz>(`/tz/${id}`).then(r => r.data),
  create: (data: TzInput) => api.post<Tz>('/tz', data).then(r => r.data),
  update: (id: number, data: TzInput) =>
    api.put<Tz>(`/tz/${id}`, data).then(r => r.data),
  remove: (id: number) => api.delete(`/tz/${id}`),
}