'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    task: DataTypes.STRING,
    status: DataTypes.ENUM('complete', 'incomplete'),
    // status: {
    //   type:   DataTypes.ENUM,
    //   values: ['complete', 'incomplete']
    // },
    user_id: DataTypes.INTEGER,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todo;
};
