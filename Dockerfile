# ----------------------
# Base (shared)
# ----------------------
FROM node:22-alpine AS base
WORKDIR /app
# don't set NODE_ENV here; each stage will override it

# Use a .dockerignore to avoid copying node_modules/.next, etc.

# ----------------------
# Dependencies (uses npm ci for reproducible installs)
# ----------------------
FROM base AS deps
# NODE_ENV doesn't really matter here; we just install deps
COPY package*.json ./
RUN npm ci

# ----------------------
# Dev image (hot reload)
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
# Build (create optimized Next.js build)
# ----------------------
FROM deps AS build
# ✅ For builds, we want a proper production env
ENV NODE_ENV=production
# If you need build-time vars, use ARG (avoid putting secrets here)
# ARG NEXT_PUBLIC_SOMETHING
COPY . .
RUN npm run build

# ----------------------
# Production runtime (slim)
# ----------------------
FROM node:22-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# Only copy what runtime needs
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output & public assets
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
# no need to copy next.config.*, it's only used at build time

EXPOSE 3000
CMD ["npm", "run", "start"]