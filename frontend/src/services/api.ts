import axios from 'axios'
import type { User, Module, Mission, ModuleProgress, MissionProgress } from '@/types'
import router from '@/router'

// Create axios instance
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global 401 handler: redirect to login if unauthorized
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      // Optional: clear other auth data if needed
      router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } })
    }
    return Promise.reject(error)
  }
)

// Auth endpoints
export const authApi = {
  login: (username: string, password: string) => 
    api.post('/token/', { username, password }),

  register: (userData: {
    username: string
    password: string
    email: string
    first_name?: string
    last_name?: string
  }) => api.post('/auth/register/', userData),

  getProfile: () => 
    api.get<User>('/auth/me/'),

  updateProfile: (data: any) => {
    console.log('3. API: enviando PATCH a /auth/me/update/ con:', data);
    return api.patch('/auth/me/update/', data);
  }
}

// Module endpoints
export const moduleApi = {
  getAll: () => 
    api.get<Module[]>('/modules/'),

  unlock: (moduleId: string) =>
    api.post<ModuleProgress>(`/modules/${moduleId}/unlock/`),

  getProgress: (moduleId: string) =>
    api.get(`/progress/module/${moduleId}/`)
}

// Mission endpoints
export const missionApi = {
  getAll: () => 
    api.get<Mission[]>('/missions/'),

  complete: (missionId: string) =>
    api.post<MissionProgress>(`/missions/${missionId}/complete/`)
}

// Progress endpoints
export const progressApi = {
  getOverview: () =>
    api.get('/progress/overview/')
}

export const declarationApi = {
  getAll: (params?: { module?: string; pillar?: string }) =>
    api.get('/declarations/', { params }),
  create: (data: { module: string; pillar: string; text: string }) =>
    api.post('/declarations/', data)
}

export const unlockedPillarApi = {
  getAll: (params?: { module?: string }) =>
    api.get('/unlocked-pillars/', { params }),
  create: (data: { module: string; pillar: string }) =>
    api.post('/unlocked-pillars/', data)
}

export default api
