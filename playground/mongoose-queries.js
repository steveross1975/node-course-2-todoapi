const {ObjectID} = require('mongodb');

const{mongoose} = require('./../server/db/mongoose');
const{Todo} = require('./../server/models/todo');
const{User} = require('./../server/models/user');

// var id = '5a12029691d85c0f4f9f7f6511';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos); //todos because the find method may return AN ARRAY OF results
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);//todo because the find method may return a single result
// });

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);//todo because the find method may return a single result
// }).catch((e) => console.log(e));

var userId = '5a10c4c6f07d230a4082e10a';

User.findById(userId).then((user) => {
  if(!user) {
    return console.log('User Id not Found');
  }
  console.log('User by Id: ', user);
}).catch((e) => console.log(e));
