const {ObjectID} = require('mongodb');

const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

//Delete multiple records:

// Todo.remove({}).then((result) =>{
//   console.log(result);
// });

// Todo.findOneAndRemove()

//Todo.findByIdAndremove()

Todo.findByIdAndRemove('5a15e0208ba70f04f4c1f80c').then((todo) => {
  console.log(todo);
});
