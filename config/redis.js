const ioredis = require('ioredis');

const redisClient = ioredis.createClient({
    host: '127.0.0.1',
    port: 6379,
  });

  redisClient.on('error', (err) => {
    console.error('error cok')
})

module.exports = redisClient