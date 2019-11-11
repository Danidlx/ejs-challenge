FROM node:alpine
WORKDIR /src/app 
COPY ["package*.json", "./"]
RUN npm i -g pm2 && npm i
COPY . .
CMD ["pm2-runtime", "app.js"]
