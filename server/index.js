const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const { db, User } = require('./db');
const session = require('express-session');
const passport = require('passport');

if(process.env.NODE_ENV === 'development') {
  require('../secrets')
}

//setting up our passport
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);//// takes two arguments, 1st one is an error if there is one and the 2nd what it wants
  } catch (error) {
    done(error);
  }
});

//logging middleware
app.use(morgan('dev'));
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Luna',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); // passport it lets us use OATH anything relating to login
app.use(passport.session()); // sets up a password

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api')); // include our routes!
app.use('/auth', require('./auth')) //mounting our auth routes

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'development') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

// Gives us a fresh database every npm start-dev
const startServer = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Serving on Port ${PORT}`);
  });
};

startServer();

module.export = app;
