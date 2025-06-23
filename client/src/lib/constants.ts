export const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

export const API_ENDPOINTS = {
  GENAI: `${API_BASE}/api/genai`
} 