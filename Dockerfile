FROM node:8.4.0

RUN mkdir /app

WORKDIR /app

ADD package.json package.json

RUN npm install

COPY . /app

CMD ["node", "app.js"]
