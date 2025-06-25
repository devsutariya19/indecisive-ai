# Next.js frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
COPY client/tsconfig.json ./
COPY client/next.config.ts ./
COPY client/components.json ./
COPY client/postcss.config.mjs ./
RUN npm install --only=production

RUN npm install --save-dev ts-node typescript @swc/core @swc/register

COPY client/ .

ENV NODE_OPTIONS="--require ts-node/register --require @swc/register"
RUN npm run build

# Go backend
FROM golang:1.24-alpine AS backend-builder
WORKDIR /app/server
COPY server/go.mod server/go.sum ./
RUN go env
RUN go mod download -x
COPY server/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Final runtime stage
FROM node:18-alpine
WORKDIR /app

# Install PM2 for process management
RUN npm install -g pm2

# Copy built Next.js app
COPY --from=frontend-builder /app/client ./client

# Copy built Go binary
COPY --from=backend-builder /app/server/main ./server/

# Copy process configuration
COPY ecosystem.config.js .

# Expose port
EXPOSE 8080

# Start both processes with PM2
CMD ["pm2-runtime", "ecosystem.config.js"]