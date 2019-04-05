const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis-server',// this is as opposed to http://blablabla, you give the name of the service, in docker-compose
  port: 6379 //it's the default port for redis always
});
client.set('visits', 0);

app.get('/', (req, res) => {
  // process.exit(0);// purposely fail, and it will restart according to the policy in docker-compose in the 'restart' tag
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => { // this corresponds to the docker-compose->node-app-> porsts. on the right side of the :
  console.log('Listening on port 8081');
});
