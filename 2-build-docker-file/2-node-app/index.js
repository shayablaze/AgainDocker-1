const express = require('express');

const app = express();

const ONE_SECOND = 1000
const TWO_SECONDS = 2000

app.get('/do-something', (req, res) => {
  giveMeError(req, res)
  // giveMeBadPerformance(req, res)
  // giveMeGoodPerformance(req, res)
});

function giveMeError(req, res) {
  res.status(400).send('Got an error blablabla 55555');
}

function giveMeBadPerformance(req, res) {
  setTimeout(function (){ res.send('Got BAD performance, 2 seconds')}, TWO_SECONDS);
}

function giveMeGoodPerformance(req, res) {
  setTimeout(function (){ res.send('Got Good performance, 1 seconds')}, ONE_SECOND);
}

app.listen(80, () => {
  console.log('Listening on port 80');
});
