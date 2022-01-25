const { MongoClient } = require('mongodb');
let client;
module.exports.connect = async () => {
  const uri =
    'mongodb+srv://admin:admin@cluster0.6siop.mongodb.net/FLIGHTS?retryWrites=true&w=majority';
  client = await new MongoClient(uri).connect();
};
module.exports.createMultipleListings = async (newListings) => {
  newListings.forEach((listing) => {
    listing.createdAt = Date.now();
    if (listing.date) listing.date = new Date(listing.date);
  });

  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .insertMany(newListings);

  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`
  );
  console.log(result.insertedIds);
};

// module.exports.findMultipleListings = async () => {
//   const result = await client
//     .db('FLIGHTS')
//     .collection('flights')
//     .find()
//     .toArray();

//   console.log(result);
// };

exports.findFlights = async (date, flightType = ['normal', 'firstClass']) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .find({ date, flight_type: { $in: flightType } })
    .toArray();
  console.log(result);
  return result;
};

exports.findFlightsWithPrice = async (
  lowerPrice,
  upperPrice,
  flightType = ['normal', 'firstClass']
) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .find({
      price: { $gte: lowerPrice, $lte: upperPrice },
      flight_type: { $in: flightType },
    })
    .toArray();
  console.log(result);
  return result;
};

exports.maxMinPrice = async (
  origin_city,
  destination_city,
  flightType = ['normal', 'firstClass']
) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .aggregate([
      {
        $match: {
          origin_city,
          destination_city,
          flight_type: { $in: flightType },
        },
      },
      {
        $group: {
          _id: 1,
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        },
      },
      {
        $project: {
          _id: 0,
          maxPrice: 1,
          minPrice: 1,
        },
      },
    ])
    .toArray();
  const { maxPrice, minPrice } = result[0];
  console.log(`Max price: ${maxPrice}`);
  console.log(`Min price: ${minPrice}`);
  return { minPrice, maxPrice };
};

exports.avgTotalPrice = async (
  origin_city,
  destination_city,
  flightType = ['normal', 'firstClass']
) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .aggregate([
      {
        $match: {
          origin_city,
          destination_city,
          flight_type: { $in: flightType },
        },
      },
      {
        $group: {
          _id: 1,
          avgPrice: { $avg: '$price' },
          totalPrice: { $sum: '$price' },
          numberOfFlights: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
          avgPrice: 1,
          numberOfFlights: 1,
        },
      },
    ])
    .toArray();
  const { totalPrice, avgPrice, numberOfFlights } = result[0];
  console.log(`Total price: ${totalPrice}`);
  console.log(`Average price: ${avgPrice}`);
  console.log(`total number of flights: ${numberOfFlights}`);
  return { totalPrice, avgPrice };
};

exports.findCheapestFlights = async (
  origin_city,
  destination_city,
  lowerPrice,
  upperPrice,
  dateRange = [new Date(null), new Date(2023, 12, 31)]
) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .aggregate([
      {
        $match: {
          origin_city,
          destination_city,
          price: { $gte: lowerPrice, $lte: upperPrice },
          date: { $gte: dateRange[0], $lte: dateRange[1] },
        },
      },
      {
        $sort: { price: 1 },
      },
      // {
      //   $limit: 1,
      // },
    ])
    .toArray();
  if (result.length === 0) {
    console.log('No flights found');
  } else {
    console.log('cheapest', result[0]);
    console.log(result);
  }
  return result;
};

exports.specificCapacityFlights = async (
  origin_city,
  destination_city,
  capacity,
  dateRange = [new Date(null), new Date(2023, 12, 31)]
) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .find({
      origin_city,
      destination_city,
      capacity,
      date: { $gte: dateRange[0], $lte: dateRange[1] },
    })
    .toArray();

  return result;
};

exports.getAirLines = async (origin_city, destination_city, date) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .aggregate([
      {
        $match: {
          origin_city,
          destination_city,
          date,
        },
      },
      {
        $group: {
          _id: '$air_line',
        },
      },
      {
        $project: {
          _id: 0,
          air_line: '$_id',
        },
      },
    ])
    .toArray();

  console.log(result);
  return result;
};

exports.deleteFlight = async (date, airline) => {
  console.log(date);
  const result = await client.db('FLIGHTS').collection('flights').deleteMany({
    date,
    air_line: airline,
  });
  console.log(result);
  console.log('finished');
  return result;
};

exports.updateFlight = async (_id, capacity) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .update(
      {
        _id,
      },
      { $set: { capacity: capacity } }
    );
  console.log(result);
  return result;
};

exports.updateFlightWithFilter = async (
  air_line,
  origin_city,
  destination_city,
  date,
  capacity
) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .update(
      { air_line, origin_city, destination_city, date },
      { $set: { capacity: capacity } }
    );
  console.log(result);
  return result;
};

exports.getAirportNames = async (
  origin_city,
  destination_city,
  date,
  limit = 2,
  pageNo = 1
) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .find({ origin_city, destination_city, date })
    .project({
      _id: 0,
      origin_air_port: 1,
      destination_air_port: 1,
    })
    .skip(limit * (pageNo - 1))
    .limit(limit)
    .toArray();
  console.log(result);
  return result;
};
exports.sortFlights = async (option) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .find()
    .sort(option)
    .toArray();
  console.log(result);
  return result;
};
