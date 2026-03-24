# --- ЕТАП 1: Збірка ---
FROM node:24-alpine AS builder
WORKDIR /app

# Enviroments als args
ARG OWNER_NAME
ENV OWNER_NAME=$OWNER_NAME

ARG OWNER_EMAIL
ENV OWNER_EMAIL=$OWNER_EMAIL

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ARG NEXT_PUBLIC_PROJECT_NAME
ENV NEXT_PUBLIC_PROJECT_NAME=$NEXT_PUBLIC_PROJECT_NAME

# Копіюємо кореневі конфіги
COPY package*.json ./
COPY tsconfig.json ./

# Копіюємо package.json усіх частин (це дозволить npm встановити залежності)
COPY packages/shared/package*.json ./packages/shared/
COPY packages/database/package*.json ./packages/database/
COPY apps/next-app/package*.json ./apps/next-app/
COPY apps/next-app/tsconfig.json ./apps/next-app/

RUN npm install

# Копіюємо вихідний код
COPY packages/shared ./packages/shared
COPY packages/database ./packages/database
COPY apps/next-app ./apps/next-app

# Генеруємо Prisma Client (використовуємо шлях з кореня)
RUN npx prisma generate --schema=packages/database/schema.prisma

# Збираємо Next.js додаток
RUN npm run build -w apps/next-app

# --- ЕТАП 2: Фінальний образ ---
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копіюємо кореневий package.json, щоб npm розумів контекст монорепозиторію
COPY --from=builder /app/package.json ./package.json

# Копіюємо папки додатка (важливо зберігати структуру apps/next-app)
COPY --from=builder /app/apps/next-app/public ./apps/next-app/public
COPY --from=builder /app/apps/next-app/.next ./apps/next-app/.next
COPY --from=builder /app/apps/next-app/package.json ./apps/next-app/package.json

# Копіюємо ВСІ node_modules (разом із згенерованою Prisma та залежностями)
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Запускаємо через npx, вказуючи шлях до папки додатка
CMD ["npx", "next", "start", "apps/next-app"]