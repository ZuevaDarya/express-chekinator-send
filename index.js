import express from 'express';
import http from 'http';

const URL = 'https://nd.kodaktor.ru/users/:n';
const app = express();

app.use(express.json());

app.get('/login/', (req, res) => {
  res.send('zuevadi');
});

app.get('/id/:n', (req, res) => {
  http.get(URL, response => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.send(data);
    });
  });
});

app.listen(1212, () => {
  console.log('Server 1212 was started!');
});