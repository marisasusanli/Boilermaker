const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../db/user');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.');
} else {
  // collect our google configuration into an object
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  };

  // configure the strategy with our config object, and write the function that passport will invoke after google sends us the user's profile and access token
  const strategy = new GoogleStrategy(googleConfig, function (
    token,
    refreshToken,
    profile,
    done
  ) {
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const imgUrl = profile.photos[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const fullName = profile.displayName;

    User.findOrCreate({
      where: { googleId },
      defaults: { email, imgUrl, firstName, lastName, fullName },
    })
      .then(([user]) => done(null, user))
      .catch(done);
  });

  // register our strategy with passport
  passport.use(strategy);

  // requests to auth/google
  router.get('/', passport.authenticate('google', { scope: 'email' }));

  // requests to auth/google/callback
  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login',
    })
  );
}

module.exports = router;
