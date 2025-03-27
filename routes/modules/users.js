const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
);

router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log('User already exist!');
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return User.create({ email, password, name })
          .then(() => res.redirect('/'))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/users/login');
  });
});

module.exports = router;
