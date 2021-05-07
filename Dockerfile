FROM node:stretch-slim

WORKDIR /src/app

COPY ["package*.json", "./"]

RUN npm ci

COPY . .

CMD ["node", "app.js"]
