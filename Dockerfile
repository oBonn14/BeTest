FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

# jika terjadi build erro 
# RUN npm init -y

# RUN npm install express

# RUN npm install ioredis

# RUN npm install redis

# RUN npm install mongoose

# RUN npm install nodemon

# RUN npm install mongodb

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]