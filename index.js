import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import multer from 'multer';
import crypto from 'crypto';

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

  app.get('/id/:id/', async (req, res) => {
    const { id } = req.params;
    const response = await (await fetch(`https://nd.kodaktor.ru/users/${id}`)).json();
    res.send(response?.login);
  });

  app.all('/decypher',  multer().fields([{ name: 'key', maxCount: 1 }, { name: 'secret', maxCount: 1 }]), (req, res) => {
    const decryptedData = crypto.privateDecrypt(
      {
        key: req.files['key'][0].buffer,
      },
      req.files['secret'][0].buffer
    );
    res.send(decryptedData);
  });

  return app;
}

const app = appSrc(express, bodyParser);

app.listen(process.env.PORT);
