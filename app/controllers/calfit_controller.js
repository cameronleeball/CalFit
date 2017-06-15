
//API and HTML Routes (look to cats router for guidance)
var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var Sequelize = require("sequelize");
var db = require('../models/index.js');
// Create all our routes and set up logic within those routes where required.

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'uname',
  passwordField: 'psw'
},
  function (uname, psw, done) {
    db.User.findOne({
      where: {
        username: uname
      }
    }, function (err, user) {
      if (err) {
        return done(err);
      };
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      };
      if (!user.validPassword(psw)) {
        return done(null, false, { message: 'Incorrect password.' });
      };
      console.log(user);
      return done(null, user);
    });
    console.log(user);
  }
));


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



router.get('/',
  function (req, res) {
    res.render('login' /* , { user: req.db.user }*/);
  });

router.get('/sign-up',
  function (req, res) {
    res.render('sign-up', { layout: 'sign-up' });
  });


router.get('/login',
  function (req, res) {
    res.render('login');
  });


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    console.log("butts");
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
    res.render('profile', { user: req.db.user });
  });


router.post('/sign-up',
  function (req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.uname,
      password: req.body.psw,
      name: req.body.fname,
      email: req.body.email
    }).then(function (dbUser) {
      res.redirect('/');
    });
  });






router.put("/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  User.update({
    devoured: req.body.devoured
  }, condition, function () {
    res.redirect("/");
  });
});


module.exports = router;