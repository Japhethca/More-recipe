
const express = require('express');
const api = require('./route/api')

const app = express();

app.use('/api', api)

app.all('*', (req, res) => {
  res.status(404).send("404: Not Found");
});

app.listen(8000,'127.0.0.1', () => {
  console.log("Server runnging. listening on port: 8000");
});

