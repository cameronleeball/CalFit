var passport = require('passport');
var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var db = require('../models/index.js');

router.get('/',
  function (req, res) {
    res.render('index', {layout: 'main'}/*, { user: req.db.user }*/);
  });

router.get('/sign-up',
  function (req, res) {
    res.render('sign-up',
      { layout: 'sign-up' });
  });

router.get('/login',
  function (req, res) {
    res.render('login',
      { layout: 'login' });
  });

router.get('/saved-meals',
  function (req, res) {
    res.render('saved-meals',
      { layout: 'saved-meals' });
  });

router.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/sign-up'
  })),
  function (req, res) {
    // console.log("butts");
    res.redirect('/');
  };

router.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { layout: 'profile' });
  });

router.post('/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/profile',
    failureRedirect: '/sign-up'
  })),


router.put("/profile", function (req, res) {

  User.update({
    data: req.body.devoured
  }, function () {
    res.redirect("/");
  });
});

module.exports = router;