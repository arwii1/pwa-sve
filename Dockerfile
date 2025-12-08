FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Синхронизируем SvelteKit и собираем приложение
RUN npm run prepare || true
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Устанавливаем serve для раздачи статических файлов
RUN npm install -g serve

# Копируем собранные файлы из первого stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "build", "-l", "3000"]
