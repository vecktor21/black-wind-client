FROM node:18-alpine
RUN yarn add net-tools
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install -y
COPY node_modules ./
COPY . ./
EXPOSE 3000
CMD ["npm","start"]