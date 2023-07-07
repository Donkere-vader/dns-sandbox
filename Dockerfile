FROM node:alpine

RUN npm install -g npm@9.3.1

WORKDIR /app
COPY package.json package.json
RUN yarn --frozen-lockfile
COPY . . 

RUN yarn build


EXPOSE 3000
CMD ["node", "/app/build/index.js"]
