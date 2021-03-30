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
    callbackURL: "http://localhost:5000/login/google/callback",
    passReqToCallback:true
  },

  
  function(req,accessToken, refreshToken, profile, done) {
    const token = User.generateAccessToken({username:profile.displayName})

     var userData = {
      email: profile.emails[0].value,
      name: profile.displayName,
      token
     };

    const {
      id: googleId, 
      displayName: username, 
      name:{givenName:firstName, familyName:lastName}, 
      photos:[{value:photo}], 
      emails: [{value:email}],
    } = profile;

    const createUser = (userdata)=>{
      User.create(userdata)
    }
    
    const getUser = (userid) => {
      return new Promise ((resolve, reject)=>{
        User.find({googleId:userid}, (err,data)=>{
          if (err){
            return reject("failure")
          }
            return resolve(data)
        }
      )})
    }

    const user = {
      googleId,
      username,
      firstName,
      lastName,
      photo,
      email,
    };

    getUser(googleId).then(
      (data)=>{
        if (data.length){
          done(null,data[0])
        }
        else{
          createUser(user)
          getUser(googleId)
            .then(newUser => {
              newUser;
              done(null, newUser[0]);
            })
            .catch(err => console.log(err));
        }
      }
    )

    done(null, userData);
  }
));

