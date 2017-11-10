FROM node:boron
MAINTAINER Lucas Duane Gomes Pimenta <lucas.duane@gmail.com>

RUN npm install -g yarn
RUN npm install -g pm2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["pm2-docker", "processes.json"]
