# exsanBeTest

## Requirements :
- Docker
- Node.js
- npm
- MongoDB
- MongoDB Compass
- Redis


## Installation

1. **Npm:**
```bash
npm install mongoose
npm install ioredis
npm install bcrypt
npm install noddemon
npm install chai-http
npm install connect-redis
npm install express-redis-cache
npm install express-session
npm install jsonwebtoken
npm install session-store
npm install sinon
npm install supertest
npm install mocha
npm install chai
```

2. **run be_test in local:**
```bash
npm run start
```

4. **Clone the Repository:**

   - Utilize the following command to clone this repository:
```bash
git clone https://github.com/oBonn14/exsanBeTest.git
```

4. **Build Docker:**
- create your network:
 ```bash
docker network create <name_network>
 ```    
- install MongoDB in Docker:
```bash
docker pull mongo
```
- run mongo in docker:
```bash
docker run --network <name_network> --name mongodb -p 27017:27017 -d mongo
```
- install redis in docker:
```bash
docker pull redis
```
- run redis in docker:
```bash
docker run --network <name_network> --name redis -p 6379:6379 -d redis
```
- build be_test:
```bash
docker build -t be_test .
```
- run be_test in docker:
```bash
docker run --network <name_network> --name project -p 3000:3000 -d be_test
```



