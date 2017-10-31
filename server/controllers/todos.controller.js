import db from '../../db/models';
import pry from 'pryjs';
var bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import config from '../../config/config';
var Todo = db.Todo;


function load(req, res, next, id) {
  Todo.findById(id)
    .then((todo) => {
      req.todo = todo; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}


function get(req, res) {
  return res.json(req.todo);
}

function create(req, res, next) {
  Todo.create(req.body.todo)
  .then((newTodo) => {
    res.json({
      success: true,
      todo: newTodo
    });
  })
  .catch(e => next(e));
}

function update(req, res, next) {
  user.save()
    .then(savedTodo => res.json(newTodo))
    .catch(e => next(e));
}

function index(req, res) {
  Todo.all()
  .then((todos) => {
		if (!todos) {
			return 'not find';
		}
		res.json({ todos: todos });
	})
  .catch((e) => {
    console.log("Error is", e);
    next(e)
  });
}

function destroy(req, res, next) {
  const todo = req.todo;
  todo.delete()
    .then(deletedTodo => res.json(deletedTodo))
    .catch(e => next(e));
}

function updateTodoState(req, res, next) {
  const todo = req.todo;
  let updatedStatus = req.body.todo.status;
  todo.update({
    status: updatedStatus
  })
  .then((updatedTodo) => {
    res.json({
      updatedTodo: updatedTodo,
      success: true
    })
  })
  .catch(e => next(e));
}

export default { load, get, create, update, index, destroy, updateTodoState };
