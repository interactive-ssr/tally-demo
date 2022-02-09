FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile
EXPOSE 8080
CMD npm run start
