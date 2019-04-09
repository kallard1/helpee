FROM node:lts-jessie

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install \
    && npm run prestart \
    && npm run webpack:prod

EXPOSE 8080

ENV SECRET_KEY="\xabW\x9e|\xd0@\xff\x9cx\xe7\x14n\x9c\xb8\x8d\x1e\xb9B\x9e\xdb\x01\xbf\xb5\x8b\x93(2\x86\x94y^\x8f"
ENV DATABASE_URL="mongodb://helpee:b4qWeUjbWuN7XBhV7cGaYCtajm6eJb@sql.area42.fr:27017/helpee_develop"

CMD ["npm", "start"]
