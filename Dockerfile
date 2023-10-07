FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 3000
USER 0
CMD [ "NODE_ENV=prod","node", "./bin/www" ]