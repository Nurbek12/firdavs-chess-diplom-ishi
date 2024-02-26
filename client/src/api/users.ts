import api from '.'

export const get_all_user = (params: any) => api.get('/api/users', { params })

export const create_user = (data: any) => api.post('/api/users', data)

export const update_user = (id: any, data: any) => api.put(`/api/users/${id}`, data)

export const delete_user = (id: any) => api.delete(`/api/users/${id}`)