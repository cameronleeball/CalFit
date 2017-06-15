module.exports = function(app) {
    var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });

 app.use(sess({

    name: 'JSESSION',

    secret: 'MYSECRETISVERYSECRET',

    store:  store,

    resave: true,

    saveUninitialized: true

}));
}