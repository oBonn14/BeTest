const mongoose = require('mongoose')
// connect db
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