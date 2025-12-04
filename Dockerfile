# ----------------------
# Base (shared)
# ----------------------
FROM node:22-alpine AS base
WORKDIR /app
# optional but often needed for some native deps
RUN apk add --no-cache libc6-compat

# ----------------------
# Dependencies (for dev + build)
# ----------------------
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ----------------------
# Dev image (hot reload, LOCAL USE)
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
# Build (create optimized Next.js standalone build)
# ----------------------
FROM base AS build
ENV NODE_ENV=production

# reuse node_modules from deps
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY . .

# relies on `output: "standalone"` in next.config
RUN npm run build

# ----------------------
# Production runtime (super slim)
# ----------------------
FROM node:22-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Copy standalone server (includes needed node_modules)
COPY --from=build /app/.next/standalone ./
# Copy static + public assets
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]