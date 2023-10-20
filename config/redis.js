const ioredis = require('ioredis');

/* build docker  */
// const redisClient = ioredis.createClient({
//     host: 'redis_container',
//     port: 6379,
//   })

// local server
  const redisClient = ioredis.createClient({
    host: '127.0.0.1',
    port: 6379,
  })

  redisClient.on('error', (err) => {
    console.error('error cok')
})

module.exports = redisClient