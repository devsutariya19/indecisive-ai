# Build the client
FROM node:22-alpine AS client-build

WORKDIR /app/client
COPY client/package*.json ./
COPY client/tsconfig.json ./
COPY client/next.config.ts ./
COPY client/postcss.config.mjs ./

RUN npm ci --only=production
RUN npm install --save-dev typescript @types/node

COPY client ./

RUN npm run build

# Build the server
FROM golang:1.24-alpine AS server-build

WORKDIR /app/server
COPY server/go.mod server/go.sum ./
RUN go mod tidy
COPY server ./
RUN go build -o server .

# Final image
FROM node:22-alpine

WORKDIR /app

# Copy the client and server build
COPY --from=client-build /app/client /app/client
COPY --from=server-build /app/server/server /app/server/

# Expose ports
EXPOSE 3000 8080

# Start application
CMD /app/server/server & npm run start --prefix /app/client