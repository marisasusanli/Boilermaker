const router = require('express').Router();
const User = require('../db/user');

// #4 section - in boilermaker authentication
// check currently-authenticated user, i.e. "who am I?"
// this is for requests sent to '/auth/me'
router.get('/me', (req, res) => {
  res.json(req.user);
});

// #2 section - in boilermaker authentication
// signup, i.e. "let `me` introduce myself"
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// #1 section - in boilermaker authentication
// DOUBLE CHECK THIS SHOULD BE ROUTER.PUT ?
// login, i.e. "you remember `me`, right?"
// this is for requests sent to '/auth/login'
router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

// #3 section - in boilermaker authentication
// DOUBLE CHECK THIS SHOULD BE ROUTER.DELETE ?
// logout, i.e. "please just forget `me`"
// this is for requests sent to '/auth/logout'
router.delete('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204); // or res.redirect('/')
});

router.use('/google', require('./google'));

module.exports = router;
