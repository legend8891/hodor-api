'use strict';
var todos = [...Array(10)].map((_, i) => {
  return {
    task: `task_${i}`,
    user_id: 1
  }
});
console.log("Todos", todos);
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', todos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
