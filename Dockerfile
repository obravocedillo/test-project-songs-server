FROM NODE:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY scripts/prisma-migration.sh ./scripts/

RUN npx prisma generate

RUN npm run build

RUN chmod +x ./scripts/prisma-migration.sh

EXPOSE 3000

ENTRYPOINT ["./scripts/prisma-migration.sh"]
