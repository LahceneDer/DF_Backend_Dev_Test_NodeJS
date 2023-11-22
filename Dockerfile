# Use an official Node.js runtime as a parent image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5353

ENV NODE_ENV=production

RUN npm run build

# Run app.js when the container launches
CMD ["npm", "run", "start"]
