const express = require('express');

const app = express();

const ONE_SECOND = 1000
const FIVE_SECONDS = 5000

app.get('/operation-1', (req, res) => {
  res.status(400).send('Got an error');
});

app.get('/operation-2', (req, res) => {
  setTimeout(function (){ res.send('Got very bad performance, 5 seconds')}, FIVE_SECONDS);
});

app.get('/operation-3', (req, res) => {
  setTimeout(function (){ res.send('Got good performance, 1 second')}, ONE_SECOND);
});

app.listen(80, () => {
  console.log('Listening on port 80');
});
