

var express = require('express'),
    Handlebars = require ('express-handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto'),
    flash = require('connect-flash'),
    session = require('express-session'),
    bodyParser = require('body-parser');
var db = require('./models/index.js');
var PORT = process.env.PORT || 8080;


var MemoryStore = require('session-memory-store')(session);

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.

passport.use(new LocalStrategy({
    usernameField: 'uname',
    passwordField: 'psw'
    },
    function (username, password, cb) {
        User.findByUsername(username, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.




passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});


// Create a new Express application.
var app = express();

app.engine('handlebars', Handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(session({

    name: 'JSESSION',

    secret: 'thisisnotasecret',

    store: new MemoryStore({ expires: 60 * 60 * 1 }),

    resave: true,

    saveUninitialized: true

}));

// Initialize Passport and restore authentication state, if any, from the
// session.

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("./public"));

var routes = require('./controllers/calfit_controller.js');

app.use('/', routes);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
