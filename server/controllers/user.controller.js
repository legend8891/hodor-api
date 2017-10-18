import db from '../../db/models';
import pry from 'pryjs';
var bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import config from '../../config/config';
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
        const payload = {
          user_id: newUser.id
        };
        var token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: '1440m' // expires in 24 hours
        });
        // set the token in Cookie
        res.cookie('hodor-token',token, { maxAge: 900000, httpOnly: true });
        // return the information including token as JSON
        res.json({
          success: true,
          user: newUser
        });
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
