FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap && yarn build

EXPOSE 3000

EXPOSE 3001

CMD yarn start
