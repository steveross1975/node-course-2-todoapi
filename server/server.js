var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
  useMongoClient: true
});

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

var newUser = new User({email: 'lippo@lippi.it'});

newUser.save().then((doc) => {
  console.log('Saved User', doc);
}, (e) => {
  console.log('Unable to save User ' + e);
});

// var newTodo = new Todo({text: 'Something to do'});
//
// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc);
// }, (e) => {
//   console.log('Unable to save Todo ' + e);
// });
