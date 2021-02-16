# FROM node:alpine as builder
# WORKDIR /app
# COPY ./package.json ./
# # RUN npm install --force
# RUN yarn install
# # RUN yarn add node-sass@4.12.0

# COPY ./ ./
# # RUN npm run build
# RUN yarn build

FROM node:8-alpine AS assets

WORKDIR /app

# Install yarn and other dependencies via apk
RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

# Install node dependencies - done in a separate step so Docker can cache it.
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile

# Copy project files into the docker image
COPY . /app/

# Build something. Let's assume that it outputs into /app/dist/
RUN yarn build:prod

# Build an python app (or something else) and copy from the previous stage
FROM python:3.6.3

# ...

COPY --from=assets /app/dist/ /app/dist/

# ...



FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html