FROM node:lts-stretch
LABEL maintainer="Kévin Allard <contact@allard-kevin.fr>"

ENV LANG C.UTF-8
RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm install \
    && npm run webpack \
    && npm run build \
    && rm -rfv webpack.config.js \
               postcss.config.js \
               build.js \
               assets \
               docker \
               src \
               .babelrc

EXPOSE 3000

VOLUME ["/app/logs", "/app/uploads"]

CMD ["npm", "start"]
