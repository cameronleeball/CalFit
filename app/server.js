

var express = require('express'),
    Handlebars = require('express-handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    env = require('dotenv').load(),
    flash = require('connect-flash'),
    session = require('express-session'),
    bodyParser = require('body-parser');
var db = require('./models/index.js');
var PORT = process.env.PORT || 8080;


var MemoryStore = require('session-memory-store')(session);

var app = express();

app.engine('handlebars', Handlebars({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

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

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));

var routes = require('./controllers/authcontroller.js');

require('./lib/passport/passport.js')(passport, db.User);

app.use('/', routes);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
