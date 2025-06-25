module.exports = {
  apps: [
    {
      name: 'nextjs',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY
      }
    },
    {
      name: 'gin-backend',
      cwd: './backend',
      script: './main',
      env: {
        PORT: 8080,
        GIN_MODE: 'release'
      }
    }
  ]
}