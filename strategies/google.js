var passport = require('passport')
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var User = require('../models/User')
const jwt = require('jsonwebtoken')

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/login/google/callback"
  },

  
  function(accessToken, refreshToken, profile, done) {
    const token = User.generateAccessToken({username:profile.displayName})

     var userData = {
      email: profile.emails[0].value,
      name: profile.displayName,
      token
     };

    const newProfile = {
      googleId:profile._json.sub,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      email:profile._json.email,
      username: profile._json.name,
      photo: profile._json.picture
    }

    const createUser = (userdata)=>{
      User.create(userdata)
    }
    
    const getUser = (userid) => {
      return new Promise ((resolve, reject)=>{
        User.find({googleId : userid}, (err,data)=>{
          if (err){
            return reject("failure")
          }
            return resolve(data)
        }
      )})
    }

    getUser(profile._json.sub).then(
      (data)=>{
        if (data.length){
          done(null,data[0])
        }
        else{
          createUser(newProfile)
          getUser(profile._json.sub)
            .then(newUser => {
              done(null, newUser[0]);
            })
            .catch(err => console.log(err));
        }
      }
    )

    done(null, userData);
  }
));

