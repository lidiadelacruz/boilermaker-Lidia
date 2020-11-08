const router = require('express').Router();
const passport = require('passport');
const { User } = require('../db');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


if (process.env.GOOGLE_CLIENT_ID) {
  // collect our google configuration into an object
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  };

  // configure the strategy with our config object, and write the function that passport will invoke after google sends
  // us the user's profile and access token
  const strategy = new GoogleStrategy(googleConfig, async function (
    token,
    refreshToken,
    profile,
    done
  ) {
    try {
      const googleId = profile.id;
      const name = profile.displayName;
      const imageUrl = profile.photos[0].value
      const [user] = await User.findOrCreate({
        where: {
          googleId,
        },
        defaults: {
          name,
          imageUrl
        },
      });
      done(null, user); // takes two arguments, 1st one is an error if there is one and the 2nd what it wants
    } catch (error) {
      done(error)
    }
  });

  // register our strategy with passport
  passport.use(strategy);

  router.get(
    '/',
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/',
    })
  );
}

module.exports = router;
