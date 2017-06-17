
var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-sign-up', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    username: username,
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    console.log(req.body);
                    var data =
                        {
                            email: req.body.email,
                            username: username,
                            password: userPassword,
                            name: req.body.name,
                            vegan: req.body.vegan,
                            vegitarian: req.body.vegitarian,
                            glutenFree: req.body.gluten,
                            lowSugar: req.body.lowSugar,
                            lowFat: req.body.lowFat,
                            fatFree: req.body.fatFree,
                            dairyFree: req.body.dairyFree,
                        };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Login'
                });
            });
        }
    ));

    passport.use('local-update', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, done) {
            User.findOne({
                where: {
                    username: username,
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                } else {
                    var data =
                        {
                            email: req.body.email,
                            username: username,
                            password: userPassword,
                            name: req.body.name,
                            vegan: req.body.vegan,
                            vegitarian: req.body.vegitarian,
                            glutenFree: req.body.gluten,
                            lowSugar: req.body.lowSugar,
                            lowFat: req.body.lowFat,
                            fatFree: req.body.fatFree,
                            dairyFree: req.body.dairyFree,
                        };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    })
};
