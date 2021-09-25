# specify the node base image with your desired version node:<version>
# FROM node:14-alpine
FROM alpine:3.7
# replace this with your application's default port
EXPOSE 8888

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install db-migrate

COPY . .

RUN chmod 755 /usr/src/app

CMD [ "npm", "start" ]