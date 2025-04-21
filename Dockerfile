# Stage 1: Building the code
FROM node:latest AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install
# Build application
RUN npm run build

# Stage 2: Run the built application
FROM node:latest AS runner

WORKDIR /app

# Environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]

# Add label for versioning
LABEL version="0.0.1"
LABEL name="NS-UI" 