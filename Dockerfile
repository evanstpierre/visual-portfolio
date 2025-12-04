# ----------------------
# Base (shared)
# ----------------------
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ----------------------
# Dependencies (for dev + build)
# ----------------------
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ----------------------
# Dev image (LOCAL ONLY)
# ----------------------
FROM deps AS dev
ENV NODE_ENV=development \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true \
    HOSTNAME=0.0.0.0

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ----------------------
# Build (Next.js standalone)
# ----------------------
FROM base AS build
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY . .

# Requires: next.config.js → { output: "standalone" }
RUN npm run build

# ----------------------
# Production runtime (small)
# ----------------------
FROM node:22-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Copy standalone server (self-contained Node server)
COPY --from=build /app/.next/standalone ./
# Copy static + public assets
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

# 🚀 Run the standalone server (NOT next start)
CMD ["node", "server.js"]