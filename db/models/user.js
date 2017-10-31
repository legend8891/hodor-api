'use strict';
var User;
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "firstName passed is empty."
          }
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "lastName passed is empty."
          }
        }
    },
    gender: DataTypes.STRING,
    dob: DataTypes.DATE,
    encrypted_password: {
        type: DataTypes.STRING,
        // allowNull: false,
        validate: {
          notEmpty: {
            msg: "lastName passed is empty."
          }
        }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    email:  {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email passed."
          },
          notEmpty: {
            msg: "No email passed."
          }
        }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {

    }
  });

  User.prototype.verifyPassword = function (password, callbackHandler) {
    bcrypt.compare(password, this.encrypted_password, function(err, verificationResult) {
      if (err) {
        return callbackHandler(err);
      }
      callbackHandler(null, verificationResult);
    });
  }



  return User;
};
