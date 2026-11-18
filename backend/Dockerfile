FROM node:22-alpine

# Устанавливаем OpenSSL и инструменты сборки C++ для bcrypt
RUN apk add --no-cache openssl python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]