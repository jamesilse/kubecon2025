# Multi-stage build for TypeScript MCP Server
FROM node:22-bookworm-slim AS base

# Set the working directory
WORKDIR /app

# Install system dependencies and Fortio
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    ca-certificates \
    jq \
    && ARCH=$(dpkg --print-architecture) \
    && FORTIO_VERSION=$(curl -s https://api.github.com/repos/fortio/fortio/releases/latest | jq -r .tag_name) \
    && wget -O /tmp/fortio.tgz "https://github.com/fortio/fortio/releases/download/${FORTIO_VERSION}/fortio-linux_${ARCH}-${FORTIO_VERSION#v}.tgz" \
    && tar -xzf /tmp/fortio.tgz -C /tmp/ \
    && mv /tmp/usr/bin/fortio /usr/local/bin/fortio \
    && chmod +x /usr/local/bin/fortio \
    && rm -rf /tmp/fortio.tgz \
    && rm -rf /var/lib/apt/lists/*

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies with caching
RUN --mount=type=cache,target=/root/.npm,sharing=locked,id=npm-cache \
    npm ci --omit=dev

# ------------------------------
# Builder stage
# ------------------------------
FROM base AS builder

# Install all dependencies including dev dependencies
RUN --mount=type=cache,target=/root/.npm,sharing=locked,id=npm-cache \
    npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ------------------------------
# Runtime stage
# ------------------------------
FROM base AS runtime

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy built application from builder stage
COPY --from=builder --chown=appuser:appuser /app/dist ./dist
COPY --chown=appuser:appuser package*.json ./

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "dist/index.js"]
