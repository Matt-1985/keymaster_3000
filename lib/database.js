const { MongoClient } = require("mongodb");

let client;
let db;
let collection;

async function connect(url, dbName) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
  setCollection("passwords");
}

async function close() {
  return await client.close();
}

function setCollection(name) {
  collection = db.collection(name);
  return collection;
}

async function replaceOne(collection, newPWObject) {
  try {
    await collection.replaceOne({ account: newPWObject.account }, newPWObject, {
      upsert: true,
    });
  } catch (e) {
    console.error(e);
  }
}

async function findInDB(entryValue) {
  try {
    const result = await collection.findOne({ account: entryValue });
    return result;
  } catch (error) {
    console.error(error);
  }
}

exports.connect = connect;
exports.close = close;
exports.setCollection = setCollection;
exports.replaceOne = replaceOne;
exports.findInDB = findInDB;
