const { MongoClient } = require('mongodb');
let client;
module.exports.connect = async () => {
  const uri =
    'mongodb+srv://admin:admin@cluster0.6siop.mongodb.net/FLIGHTS?retryWrites=true&w=majority';
  client = await new MongoClient(uri).connect();
};
module.exports.createMultipleListings = async newListings => {
  newListings.forEach(listing => {
    listing.date = new Date(listing.date);
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

module.exports.findFlights = async date => {
  const result = await clinet
    .db('FLIGHTS')
    .collection('flights')
    .find({ date })
    .toArray();
  console.log(result);
  return result;
};

module.exports.findFlightsWithPrice = async (lowerPrice, upperPrice) => {
  const result = await clinet
    .db('FLIGHTS')
    .collection('flights')
    .find({ price: { $gte: lowerPrice, $lte: upperPrice } })
    .toArray();
  return result;
};
