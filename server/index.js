const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const User = require('./db/user');

const app = express();

// create file called secrets.js in the root folder to store API keys
// add file to .gitignore so it does not get tracked on Github
if (process.env.NODE_ENV !== 'production') require('../secrets');

// logging middleware
app.use(morgan('dev'));

// static middleware
// so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, '../public')));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware - MUST come before routing middleware
// enter your secret here
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware - MUST come after session middleware
app.use(passport.initialize());
app.use(passport.session());

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// routing middleware
// api routes
app.use('/api', require('./api')); // matches all requests to /api
app.use('/auth', require('./auth')); // matches all requests to /auth

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
