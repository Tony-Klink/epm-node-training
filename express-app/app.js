import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { sequelize } from './sequelize';
import { cookieParser } from './middlewares/cookieMiddleware';
import { parseQuery } from './middlewares/queryMiddleware';
import router from './routes';

import { User } from './models/user';

import passport from 'passport';
import * as plStr from 'passport-local';
import * as fbStr from 'passport-facebook';
import * as twStr from 'passport-twitter';
import * as glStr from 'passport-google-oauth';

const LocalStrategy = plStr.Strategy;
const FacebookStrategy = fbStr.Strategy;
const TwitterStategy = twStr.Strategy;
const GoogleStategy = glStr.OAuthStrategy;
const GoogleOAuth2Strategy = glStr.OAuth2Strategy;

const sess = {
    secret: 'SUPER_SECRET',
    resave: false,
    saveUninitialized: true,
};

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();


app.use(cookieParser);
app.use(parseQuery);
app.use(router);
app.use(session(sess));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
//#region passport.js
const authenticate = async (username, password) => {
    console.log('username, password: ', username, password);
    const user = await User.findOne({ name: username, password: password });
    if (user) {
        return true;
    } else {
        return false;
    }
};

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log('username, password: ', username, password);
    // check if the user is authenticated or not
    if (authenticate(username, password)) {
        const user = await User.findOne({ name: username, password: password });
        return done(null, user);
    }
    return done(null, false);
}));

passport.use(new FacebookStrategy({
    clientID: 'FACEBOOK_APP_ID',
    clientSecret: 'FACEBOOK_APP_SECRET',
    callbackURL: 'http://www.example.com/login/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ name: username, password: password });
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

passport.use(new TwitterStategy({
    consumerKey: 'TWITTER_CONSUMER_KEY',
    consumerSecret: 'TWITTER_CONSUMER_SECRET',
    callbackURL: 'http://www.example.com/login/twitter/callback'
},
    async (token, tokenSecret, profile, done) => {
        const user = await User.findOne({ name: username, password: password });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
));

passport.use(new GoogleStategy({
    consumerKey: 'GOOGLE_CONSUMER_KEY',
    consumerSecret: 'GOOGLE_CONSUMER_SECRET',
    callbackURL: 'http://www.example.com/login/google/callback'
},
    async (token, tokenSecret, profile, done) => {
        const user = await User.findOne({ name: username, password: password });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
));

passport.use(new GoogleOAuth2Strategy({
    clientID: 'GOOGLE_CLIENT_ID',
    clientSecret: 'GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://www.example.com/login/google2/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ name: username, password: password });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
}))

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    return done(null, user);
});

// LocalStrategy
app.post('/login/local', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/products',
    failureFlash: false
}));

// FacebookStrategy
app.get('/login/facebook', passport.authenticate('facebook'));
app.get('/login/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/secret',
        failureRedirect: '/products'
    }));

// TwitterStrategy
app.get('/login/twitter', passport.authenticate('twitter'));
app.get('/login/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect: '/secret',
        failureRedirect: '/product'
    }));

// GoogleStrategy
app.get('/login/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
app.get('/login/google/callback',
    passport.authenticate('google', { failureRedirect: '/products' }),
    function (req, res) {
        res.redirect('/secret');
    });

// GoogleOAuth2Strategy
app.get('/login/google2',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/login/google2/callback', 
  passport.authenticate('google', { failureRedirect: '/secret' }),
  function(req, res) {
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
//#endregion
export default app;