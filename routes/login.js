var express = require('express');
var router = express.Router();
var userController = require("../controllers/UserController")

var passport = require('passport')
var strategyGoogle = require('../strategies/google')

router.post("/", userController.Login)

router.post("/register", userController.Register)


router.get('/google', 
  passport.authenticate('google', { scope : ['profile'] }));
 
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/error' }),
//   function(req, res) {
//     // Successful authentication, redirect success.
//     res.redirect('/success');
//   });
router.get('/google/callback', (req,res)=>{
    res.send("authenticated")
})

module.exports = router;
