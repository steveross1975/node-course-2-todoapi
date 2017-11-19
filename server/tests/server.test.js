const expect = require('expect');
const request = require('supertest');

var {mongoose} = require('./../db/mongoose');
const {app} = require('./../server');
const Todo = mongoose.model('Todo');

const todos = [{
  text: "First test Todo"
}, {
  text: "Second test Todo"
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) =>{//Callback function that checks for errors in the todos POST send
      if (err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {//Callback function that checks if the todo was inserted in mongodb
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));//if not, it catches en error
    });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) =>{//Callback function that checks for errors in the todos POST send
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {//Callback function that checks if the todo was inserted in mongodb
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));//if not, it catches en error
    });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
