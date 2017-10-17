import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import db from '../../db/models';
import pry from 'pryjs';
var bcrypt = require('bcrypt');
var User = db.User;
/**
* Returns jwt token if valid username and password is provided
*/
function login(req, res, next) {

  var authenticationParams = req.body.user;
  // find the user by email
  User.findOne({ where: {email: authenticationParams.email} }).then(function(user) {
    if (!user) {
      // res.json({ success: false, message: 'Authentication failed. User not found.' });
      const err = new APIError(`Authentication failed. No user found with email ${authenticationParams.email}`, httpStatus.UNAUTHORIZED, true);
      return next(err);
    } else if (user) {
      // verify if password matches
      user.verifyPassword(authenticationParams.password, function(error, verificationResult) {
        if (verificationResult && !error) {
          // if user is found and password is right
          // create a token with only our given payload
          // we don't want to pass in the entire user since that has the password
          const payload = {
            user_id: user.id
          };
          var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: '1440m' // expires in 24 hours
          });
          // set the token in Cookie
          res.cookie('hodor-token',token, { maxAge: 900000, httpOnly: true });
          // return the information including token as JSON
          res.json({
            success: true,
            token: token
          });
        } else {
          const err = new APIError('Authentication failed. Wrong password', httpStatus.UNAUTHORIZED, true);
          return next(err);
        }
      });
    }
  });

}

function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
