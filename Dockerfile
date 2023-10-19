FROM node:14-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Run the application
CMD ["node", "index.js"]