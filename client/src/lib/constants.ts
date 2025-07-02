export const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''

export const API_ENDPOINTS = {
  GENAI: `${API_BASE}/api/genai`,
  HEALTH: `${API_BASE}/api/health`
}

export const http = {
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400
}