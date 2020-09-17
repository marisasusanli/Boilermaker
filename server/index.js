const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

// logging middleware
app.use(morgan('dev'));

// static middleware
// so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../public')));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/api', require('./api')); // matches all requests to /api

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
// This sends index.html for any requests that do not match one of the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// handles 500 errors
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

app.listen(port, function () {
  console.log('Knock, knock');
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});
