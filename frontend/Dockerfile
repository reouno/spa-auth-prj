# ref: https://medium.com/swlh/django-rest-framework-and-spa-session-authentication-with-docker-and-nginx-aa64871f29cd
# ref: https://qiita.com/kawadumax/items/ee73304579254f4398ad

FROM node:alpine

WORKDIR /code

RUN apk update && \
    apk add --no-cache git curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

COPY . /code/

RUN yarn install
