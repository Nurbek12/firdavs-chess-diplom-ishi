import axios from 'axios'
import useStore from '@/store'

// export const baseURL = 'http://localhost:4000'
export const baseURL = ''

const store = useStore()
const api = axios.create({ baseURL })

api.interceptors.response.use(
  (response) => {
    checkToken();
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) store.logout();
    return Promise.reject(error);
  }
);

export function checkToken() {
  const token = store.token
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

checkToken()

export default api