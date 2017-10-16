import config from './config';
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
import db from '../../db/models';
import pry from 'pryjs'
var User = db.User;

// Setup work and export for the JWT passport strategy
module.exports = function(passport, req) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.jwtSecret;
  opts.tokenQueryParameterName = 'auth_token';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // if token is valid set current_user in request variable
		User.findOne({ where: {id: jwt_payload.user_id} }).then(function(user) {
			if (!user) {
				done(null, false);
			}
      // req.currentUser = user;
      done(null, user);
		}).catch((errorHandler) => {
      debugger;
			done(errorHandler, false);
		});
  }));
};
