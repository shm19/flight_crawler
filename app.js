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

    // await db.findFlights();
    // await db.findFlights(new Date('2022-06-23'), ['firstClass']);
    // await db.findFlightsWithPrice(10, 50);
    // await db.maxMinPrice('Tehran', 'Paris');
    // await db.avgTotalPrice('Tehran', 'Paris');
    // await db.findCheapestFlights('Tehran', 'Paris', 100, 1000, [
    //   new Date('2022-06-23'),
    //   new Date('2022-06-24'),
    // ]);
    // await db.getAirLines(
    //   'Tehran',
    //   'Yazd',
    //   new Date('2022-06-23T00:25:00.000+00:00')
    // );
    await db.deleteFlight(
      new Date('2022-06-23T00:30:00.000+00:00'),
      'ATA Airlines'
    );
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
