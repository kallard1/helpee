FROM node:lts-jessie

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install \
    && npm run prestart \
    && npm run webpack:prod

EXPOSE 8080

CMD ["npm", "start"]