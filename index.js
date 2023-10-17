const express = require('express');
const router = require('./route/route');
const db = require('./config/server.js');
const http = require('http'); // Import the http module

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);

const server = http.createServer(app); // Create an http.Server instance

server.listen(port, (err) => {
  if (!err) {
    console.log('Server running on port ' + port);
  } else {
    console.error('Failed to start the server:', err);
  }
});

module.exports = server; // Export the http.Server instance
