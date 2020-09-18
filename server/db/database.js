const Sequelize = require('sequelize');
const chalk = require('chalk');
const pkg = require('../../package.json');

// gets name of database from package.json file
// must match name of database in postico etc.
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}_test` : pkg.name;
console.log(chalk.yellow(`Opening database connection to ${dbName}`));

// include Heroku database info here if using one
const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false, // unless you like the logs
});

module.exports = db;
