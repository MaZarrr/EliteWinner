FROM node:latest

WORKDIR /app/contest

EXPOSE 3000

COPY package*.json /app/contest/

RUN npm install

COPY . /app/contest/

CMD [ "npm", "run", "dev" ]

