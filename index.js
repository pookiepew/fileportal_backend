const express = require('express');
const cors = require('cors');
const volleyball = require('volleyball');
const helmet = require('helmet');

// const websocket = require('./controllers/websocket');

const mongoDB = require('./mongoDB');

const HttpError = require('./models/HttpError');

const config = require('./config');

const app = express();

app.use(cors());
app.use(volleyball);
app.use(helmet());
app.use(express.json());

app.use('/', require('./routes'));

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred!',
    code: error.code || 500
  });
});

const port = config.PORT || 2089;

const server = app.listen(port, async () => {
  console.log(`http://${config.HOST}:` + server.address().port);
  // websocket.connect();
  await mongoDB.connect();
});
