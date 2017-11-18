//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  //findOneAndUpdate
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('5a10b2f698d0ed9ce591849a')
  }, {
    $set: {
      completed: true
    }
  }, {
    upsert: true,
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a10a4ebcbf142053f3c717b')
  }, {
    $set: {
      name: 'Stefano'
    },
    $inc: {
      age: 1
    }
  }, {
    upsert: true,
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //db.close();
});
