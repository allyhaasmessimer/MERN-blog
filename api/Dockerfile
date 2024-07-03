FROM node:18

WORKDIR /react-docker-backend/

COPY ../package.json ../package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
