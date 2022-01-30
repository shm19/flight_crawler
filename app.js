const express = require('express');
const createError = require('http-errors');
const api = require('./routes/api');
const db = require('./db');
const { getFlightData } = require('./data');
const { ObjectId } = require('mongodb');

start();

async function start() {
  try {
    await db.connect();
    const result = await getFlightData();
    db.createMultipleListings(result);
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
    // await db.deleteFlight(
    //   new Date('2022-06-23T00:30:00.000+00:00'),
    //   'ATA Airlines'
    // );
    // await db.updateFlight(ObjectId('61f0383e2d4298eea21f6997'), 100);
    // await db.updateFlightWithFilter(
    //   'Iran Aseman Airlines',
    //   'Tehran',
    //   'Sirjan',
    //   new Date('2022-06-23T01:00:00.000+00:00'),
    //   100
    // );
    // await db.getAirportNames('Tehran', 'Paris', new Date(null), 2, 2);
    // await db.sortFlights({ price: -1 });
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
