const expect = require('expect');
const request = require('supertest');

var {mongoose} = require('./../db/mongoose');
const {app} = require('./../server');
const Todo = mongoose.model('Todo');
const {ObjectID} = require('mongodb')


const todos = [{
  _id: new ObjectID(),
  text: "First test Todo"
}, {
  _id: new ObjectID(),
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

//console.log(`/todos/${todos[0]._id.toHexString()}`);
describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        //console.log(res);
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    var fakeId = new ObjectID();
    request(app)
      .get(`/todos/${fakeId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return a 404 if todo not found', (done) => {
    var fakeId = new ObjectID();
    request(app)
      .delete(`/todos/${fakeId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});
