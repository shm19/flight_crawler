const { MongoClient } = require('mongodb');
module.exports = async function connect() {
  const uri = '';
  await new MongoClient(uri).connect();
};
