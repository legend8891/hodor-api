import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      user: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        gender: Joi.string().required(),
        dob: Joi.date(),
        email: Joi.string().email()
      }
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      user: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    }
  }
};
