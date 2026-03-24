# --- ЕТАП 1: Збірка (Build) ---
FROM node:22-alpine AS builder

WORKDIR /app

# Передаємо змінні як аргументи збірки (Build Args)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_PUBLIC_PROJECT_NAME
ENV VITE_PUBLIC_PROJECT_NAME=$VITE_PUBLIC_PROJECT_NAME

ARG VITE_PUBLIC_OWNER_NAME
ENV VITE_PUBLIC_OWNER_NAME=$VITE_PUBLIC_OWNER_NAME

ARG VITE_PUBLIC_OWNER_EMAIL
ENV VITE_PUBLIC_OWNER_EMAIL=$VITE_PUBLIC_OWNER_EMAIL

# Копіюємо файли для встановлення залежностей воркспейсу
COPY package*.json ./
COPY tsconfig.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY apps/react-spa/package*.json ./apps/react-spa/
COPY apps/react-spa/tsconfig.json ./apps/react-spa/

# Встановлюємо залежності
RUN npm install

# Копіюємо вихідний код
COPY packages/shared ./packages/shared
COPY apps/react-spa ./apps/react-spa

# Збираємо статичні файли (Vite створить папку dist)
RUN npm run build -w apps/react-spa

# --- ЕТАП 2: Фінальний образ (Nginx) ---
FROM nginx:alpine AS runner

# Копіюємо зібрану статику з першого етапу в папку Nginx
COPY --from=builder /app/apps/react-spa/dist /usr/share/nginx/html

# Додаємо кастомний конфіг Nginx (щоб працював React Router)
COPY apps/react-spa/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]