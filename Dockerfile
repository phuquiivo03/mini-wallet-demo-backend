# =========================
# Base
# =========================
FROM node:22 AS base

WORKDIR /app


# =========================
# Dependencies
# =========================
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm ci


# =========================
# Build
# =========================
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY package.json ./
COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

# Generate Prisma Client
RUN DATABASE_URL="" \
    npx prisma generate

# Compile TypeScript
RUN npm run build


# =========================
# Production
# =========================
FROM node:22 AS production

WORKDIR /app

ENV NODE_ENV=production

RUN groupadd --system nodejs \
    && useradd --system --gid nodejs nodejs

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
