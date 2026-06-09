FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

COPY scripts/prisma-migration.sh ./scripts/

RUN npx prisma generate

RUN npm run build

RUN chmod +x ./scripts/prisma-migration.sh

EXPOSE 3002

ENTRYPOINT ["./scripts/prisma-migration.sh"]
