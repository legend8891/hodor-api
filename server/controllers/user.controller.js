import db from '../../db/models';
import pry from 'pryjs';
var bcrypt = require('bcrypt');
var User = db.User;


function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}


function get(req, res) {
  return res.json(req.user);
}

function create(req, res, next) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(req.body.user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      // delete password property from req.body.user
      delete req.body.user.password
      req.body.user.encrypted_password = hash;
      User.create(req.body.user)
      .then((newUser) => {
        res.json({ user: newUser });
      })
      .catch(e => next(e));
    });
  });
}

function update(req, res, next) {

  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

function index(req, res) {
  User.all()
  .then((users) => {
		if (!users) {
			return 'not find';
		}
		res.json({ users: users });
	});
}

function destroy(req, res, next) {
  const user = req.user;
  user.delete()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default { load, get, create, update, index, destroy };
