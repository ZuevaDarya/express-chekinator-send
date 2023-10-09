import express from 'express';
import bodyParser from 'body-parser';

function appSrc(express, bodyParser) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    next();
  });

  app.get('/login/', (req, res) => {
    res.send('zuevadi');
  });

  app.get('/id/:input/', (req, res) => {
    const input = req.params.input;
    fetch(`https://nd.kodaktor.ru/users/${input}`)
      .then(response => response.text())
      .then(text => JSON.parse(text))
      .then(json => res.send(json.login))
  });

  return app;
}

const app = appSrc(express, bodyParser);

app.listen(process.env.PORT);
