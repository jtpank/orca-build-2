# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /front-end
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000