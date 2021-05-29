FROM node:lts-alpine@sha256:ed51af876dd7932ce5c1e3b16c2e83a3f58419d824e366de1f7b00f40c848c40

RUN apk add dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json /usr/src/app/

RUN npm ci --production-only

COPY --chown=node:node . /usr/src/app

USER node

CMD ["dumb-init", "node", "app.js"]
