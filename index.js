const express = require('express');
const router = require('./route/route');
const db = require('./config/server.js')
const app = express();
const port = 3000

app.use(express.json())

app.use('/api', router);

app.listen(port, (err) => {
  if (!err) {
    console.log('Server running on port ' + port);
  } else {
    console.error('Failed to start the server:', err);
  }
});

