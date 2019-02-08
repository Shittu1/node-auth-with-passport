const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configDB = require('./config/database.js');

// configuration
mongoose.connect(configDB.url, { useMongoClient: true }); // connect to database

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({ 
    resave: true,
    saveUninitialized: true,
    secret: 'ilovecoding' 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./app/routes.js')(app, passport);

// launch
app.listen(port);
console.log('The magic happens on port ' + port);