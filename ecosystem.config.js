module.exports = {
  apps: [
    {
      name: 'indecisive-ai',
      cwd: './client',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      }
    },
    {
      name: 'genai-api',
      cwd: './server',
      script: './main',
      env: {
        PORT: 8080,
        GIN_MODE: 'release',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY
      }
    }
  ]
}