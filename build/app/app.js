'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieMiddleware = require('./middlewares/cookieMiddleware');

var _queryMiddleware = require('./middlewares/queryMiddleware');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var plStr = _interopRequireWildcard(_passportLocal);

var _passportFacebook = require('passport-facebook');

var fbStr = _interopRequireWildcard(_passportFacebook);

var _passportTwitter = require('passport-twitter');

var twStr = _interopRequireWildcard(_passportTwitter);

var _passportGoogleOauth = require('passport-google-oauth');

var glStr = _interopRequireWildcard(_passportGoogleOauth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocalStrategy = plStr.Strategy;
const FacebookStrategy = fbStr.Strategy;
const TwitterStategy = twStr.Strategy;
const GoogleStategy = glStr.OAuthStrategy;
const GoogleOAuth2Strategy = glStr.OAuth2Strategy;

const sess = {
    secret: 'SUPER_SECRET',
    resave: false,
    saveUninitialized: true
};

const app = (0, _express2.default)();

app.use(_cookieMiddleware.cookieParser);
app.use(_queryMiddleware.parseQuery);
app.use(_routes2.default);
app.use((0, _expressSession2.default)(sess));
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

const authenticate = (username, password) => {
    console.log('username, password: ', username, password);
    const user = _user2.default.findOne({ name: username, password: password });
    if (user) {
        return true;
    } else {
        return false;
    }
};

_passport2.default.use(new LocalStrategy((username, password, done) => {
    console.log('username, password: ', username, password);
    // check if the user is authenticated or not
    if (authenticate(username, password)) {
        const user = _user2.default.findOne({ name: username, password: password });
        return done(null, user);
    }
    return done(null, false);
}));

_passport2.default.use(new FacebookStrategy({
    clientID: 'FACEBOOK_APP_ID',
    clientSecret: 'FACEBOOK_APP_SECRET',
    callbackURL: 'http://www.example.com/login/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    const user = _user2.default.findOne({ name: username, password: password });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

_passport2.default.use(new TwitterStategy({
    consumerKey: 'TWITTER_CONSUMER_KEY',
    consumerSecret: 'TWITTER_CONSUMER_SECRET',
    callbackURL: 'http://www.example.com/login/twitter/callback'
}, (token, tokenSecret, profile, done) => {
    const user = _user2.default.findOne({ name: username, password: password });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

_passport2.default.use(new GoogleStategy({
    consumerKey: 'GOOGLE_CONSUMER_KEY',
    consumerSecret: 'GOOGLE_CONSUMER_SECRET',
    callbackURL: 'http://www.example.com/login/google/callback'
}, (token, tokenSecret, profile, done) => {
    const user = _user2.default.findOne({ name: username, password: password });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

_passport2.default.use(new GoogleOAuth2Strategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://www.example.com/login/google2/callback'
}, (accessToken, refreshToken, profile, done) => {
    const user = _user2.default.findOne({ name: username, password: password });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

_passport2.default.serializeUser((user, done) => {
    return done(null, user);
});

_passport2.default.deserializeUser((user, done) => {
    return done(null, user);
});

// LocalStrategy
app.post('/login/local', _passport2.default.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/products',
    failureFlash: false
}));

// FacebookStrategy
app.get('/login/facebook', _passport2.default.authenticate('facebook'));
app.get('/login/facebook/callback', _passport2.default.authenticate('facebook', {
    successRedirect: '/secret',
    failureRedirect: '/products'
}));

// TwitterStrategy
app.get('/login/twitter', _passport2.default.authenticate('twitter'));
app.get('/login/twitter/callback', _passport2.default.authenticate('twitter', {
    successRedirect: '/secret',
    failureRedirect: '/product'
}));

// GoogleStrategy
app.get('/login/google', _passport2.default.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
app.get('/login/google/callback', _passport2.default.authenticate('google', { failureRedirect: '/products' }), function (req, res) {
    res.redirect('/secret');
});

// GoogleOAuth2Strategy
app.get('/login/google2', _passport2.default.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/login/google2/callback', _passport2.default.authenticate('google', { failureRedirect: '/secret' }), function (req, res) {
    res.redirect('/products');
});

const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
};

app.get('/secret', isAuthenticated, (req, res) => {
    res.json({ secret: { user: req.user } });
});

exports.default = app;