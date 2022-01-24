const express = require('express');
const createError = require('http-errors');
const http = require('http');
const api = require('./routes/api');
const db = require('./db');
const { getData } = require('./data');

db.connect();
getData();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', api);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log(err);
});

app.set('port', 3000);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000, () => console.log('server started on port 3000...'));
