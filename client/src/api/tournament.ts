import api from '.'

export const get_all = (params: any) => api.get('/api/tournaments', { params })

export const create = (data: any) => api.post('/api/tournaments', data)

export const attend = (id: any) => api.put(`/api/tournaments/attend/${id}`)

export const start = (id: any) => api.put(`/api/tournaments/start/${id}`)

export const timeline = () => api.get('/api/tournaments/games/time')

export const get_game = (id: any) => api.get(`/api/tournaments/game/${id}`)

export const get_games = () => api.get(`/api/tournaments/games`)

export const winner_game = (id: any, user: any) => api.put(`/api/tournaments/game/win/${id}/${user}`)