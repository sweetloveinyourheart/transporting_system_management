FROM node:16

WORKDIR /admin
COPY . .

RUN yarn install

RUN yarn build
EXPOSE 3000
CMD ["node","server.js"]