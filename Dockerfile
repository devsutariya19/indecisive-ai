# Next.js frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ .
RUN npm run build

# Go backend
FROM golang:1.21-alpine AS backend-builder
WORKDIR /app/server
COPY server/go.mod server/go.sum ./
RUN go mod download
COPY server/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Final runtime stage
FROM node:18-alpine
WORKDIR /app

# Install PM2 for process management
RUN npm install -g pm2

# Copy built Next.js app
COPY --from=frontend-builder /app/client/.next ./client/.next
COPY --from=frontend-builder /app/client/public ./client/public
COPY --from=frontend-builder /app/client/package.json ./client/
COPY --from=frontend-builder /app/client/node_modules ./client/node_modules

# Copy built Go binary
COPY --from=backend-builder /app/server/main ./server/

# Copy process configuration
COPY ecosystem.config.js .

# Expose port
EXPOSE 8080

# Start both processes with PM2
CMD ["pm2-runtime", "ecosystem.config.js"]