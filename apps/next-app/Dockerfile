FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY packages/database/package*.json ./packages/database/
COPY apps/next-app/package*.json ./apps/next-app/
RUN npm install
COPY packages/shared ./packages/shared
COPY packages/database ./packages/database
COPY apps/next-app ./apps/next-app
RUN npx prisma generate --schema=packages/database/schema.prisma
RUN npm run build -w apps/next-app

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/next-app/public ./public
COPY --from=builder /app/apps/next-app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "run", "start", "-w", "apps/next-app"]