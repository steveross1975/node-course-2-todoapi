//First of all: start a terminal in the mongo/bin directory w/
//./mongod --dbpath ~/Documents/Corso-NodeJS-Udemy/mongo-data/
//command
const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json()); //to send JSON to the Express app

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET todos/:id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo) {
      res.status(404).send();
    } else {
      res.send(todo);
    }
  }, (e) => {
    res.status(400).send();
  });
  //validate ID using isValid
    //404 - send back empty body
  //findById
    //Success Case
      // IF todo - send it back
      //if !todo - send 404 and empty body
    //Error Case
      //400 - request not valid: empty body
})

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
