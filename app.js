const express = require('express');
const createError = require('http-errors');
const api = require('./routes/api');
const db = require('./db');
const { getData } = require('./data');
start();

async function start() {
  try {
    await db.connect();
    // const result = await getData();
    // console.log(result);
    await db.findMultipleListings();
    // db.createMultipleListings(result);
  } catch (error) {}
}

const app = express();

app.use('/', (req, res, next) => {
  console.log(req.headers);
  console.log(req.url);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) =>
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    err,
  })
);

app.listen(3000, () => console.log('Server is running on port 3000'));
