const router = require('express').Router();
const { User } = require('../db');

router.use('/google', require('./google'))

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (!user) res.status(401).send('User not found');
    else if (!user.correctPassword(req.body.password))
      res.status(401).send('Incorrect Password');
    else req.login(user, (err) => (err ? next(err) : res.send(user)));
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.send(user)));
  } catch (error) {
    next(error);
  }
});

router.post('/delete', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
