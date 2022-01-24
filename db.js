const { MongoClient } = require('mongodb');
let client;
module.exports.connect = async () => {
  const uri =
    'mongodb+srv://admin:admin@cluster0.6siop.mongodb.net/FLIGHTS?retryWrites=true&w=majority';
  client = await new MongoClient(uri).connect();
};
module.exports.createMultipleListings = async (newListings) => {
  const result = await client
    .db('FLIGHTS')
    .collection('flights')
    .insertMany(newListings);

  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`
  );
  console.log(result.insertedIds);
};
