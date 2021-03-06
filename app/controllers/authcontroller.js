var passport = require('passport');
var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var db = require('../models/index.js');

router.get('/',
  function (req, res) {
    res.render('index', {layout: 'main'}/*, { user: req.db.user }*/);
  });

router.get('/login',
  function (req, res) {
    res.render('login',
      { layout: 'login' });
  });

router.get('/sign-up',
  function (req, res) {
    res.render('sign-up', 
    { layout: 'sign-up' });
  });

router.get('/saved-meals',
  function (req, res) {
    res.render('saved-meals',
      { layout: 'saved-meals' });
  });

router.post('/login',
  passport.authenticate('local-login',
    { failureRedirect: '/login' }),
  function (req, res) {
    // console.log("butts");
    res.redirect('/');
  });

router.get('/logout',
  function (req, res) {
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile' , { layout: 'profile' });/*, { user: req.body.User }*/
  });

router.post('/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/profile',
    failureRedirect: '/sign-up'
  }));

module.exports = router;