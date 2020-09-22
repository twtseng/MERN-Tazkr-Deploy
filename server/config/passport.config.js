const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {google,facebook,twitter,github} = require('./keys.config');

module.exports = () => {
    passport.serializeUser((user,cb) => cb(null,user));
    passport.deserializeUser((user,cb) => cb(null,user));

    const callback = (accessToken,refreshToken,profile,done) => done(null,profile);

    passport.use(new GoogleStrategy({...google,callbackURL:"/auth/google/callback",proxy: true},callback));
    //passport.use(new FacebookStrategy({...facebook,callbackURL:"/auth/facebook/callback",proxy: true},callback));
    //passport.use(new TwitterStrategy({...twitter,callbackURL:"http://localhost:8000/auth/twitter/callback"},callback));
    //passport.use(new GithubStrategy({...github,callbackURL:"http://localhost:8000/auth/github/callback"},callback));
}