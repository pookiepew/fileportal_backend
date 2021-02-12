FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2089

CMD [ "npm", "run", "dev"]