const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const config = require('../config/index')

const url = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`;

const getMongoDBConnection = () => (
  new Promise(resolve => MongoClient.connect(url, (_, db) => resolve(db))))

module.exports = {
  get: (workCollection, query) => new Promise(async (resolve) => {
    const db = await getMongoDBConnection()
    const collection = db.collection(workCollection);
    collection.find(query, (_, result) => {
      result.toArray().then(resultArray => resolve(resultArray))
    });
  }),

  remove: (id, workCollection) => new Promise(async (resolve) => {
    const db = await getMongoDBConnection()
    const collection = db.collection(workCollection);
    collection.deleteMany({ _id: ObjectID(id) }, () => {
      resolve(id)
    })
  }),

  insert: (body, workCollection) => new Promise(async (resolve) => {
    const db = await getMongoDBConnection()
    const collection = db.collection(workCollection);
    collection.insertOne(body, (err, result) => {
      resolve(result.ops)
    })
  }),

  update: (id, changes, workCollection) => new Promise(async (resolve) => {
    const db = await getMongoDBConnection()
    const collection = db.collection(workCollection);
    collection.updateOne({ _id: ObjectID(id) },
      { $set: changes },
      () => {
        resolve(Object.assign({ id }, changes))
      });
  }),
}
