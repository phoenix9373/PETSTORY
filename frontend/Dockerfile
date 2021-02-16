FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
# RUN npm install --force
RUN yarn install
RUN yarn add node-sass@4.12.0
COPY ./ ./
# RUN npm run build
RUN yarn build

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
        [ your npm dependencies here ] \
    && apk del .gyp


FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html