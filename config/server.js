const mongoose = require('mongoose')

// connect build docker
// const dbURL = 'mongodb://mongodb_container:27017/db_MExsan_betest'

// connect local 
const dbURL = 'mongodb://127.0.0.1:27017/db_MExsan_betest'

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'failed conection: '))  
db.once('open', () => {
  console.log('Connect To MongoDB')
})