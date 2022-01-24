const { MongoClient } = require('mongodb');
module.exports.connect = async () => {
  const uri =
    'mongodb+srv://admin:admin@cluster0.6siop.mongodb.net/FLIGHTS?retryWrites=true&w=majority';
  await new MongoClient(uri).connect();
};
