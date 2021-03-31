FROM node:lts-alpine3.10 AS BASE

WORKDIR /usr/src

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY ./app ./app
COPY ./tsconfig.json ./

RUN npm run build

RUN npm ci --only=prod

EXPOSE 3000

CMD ["npm", "run", "start"]