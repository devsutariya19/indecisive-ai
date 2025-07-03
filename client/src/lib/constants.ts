export const API_BASE = 'http://localhost:8080';

export const API_ENDPOINTS = {
  GENAI: `${API_BASE}/api/genai`,
  HEALTH: `${API_BASE}/api/health`
}

export const http = {
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  BAD_REQUEST: 400
}