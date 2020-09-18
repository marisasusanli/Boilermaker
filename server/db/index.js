// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models:

const db = require('./database');
// const Puppy = require('./puppy');
const User = require('./user');

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example: Puppy.belongsTo(Owner)

module.exports = {
  // Include your models in this exports object as well!
  db,
  // Puppy,
  User,
};
