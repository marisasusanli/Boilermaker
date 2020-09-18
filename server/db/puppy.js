const Sequelize = require('sequelize');
const db = require('./database');

module.exports = db.define('puppy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 25,
    },
  },
  trained: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});
