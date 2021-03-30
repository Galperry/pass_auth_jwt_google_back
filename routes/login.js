var express = require('express');
var router = express.Router();
var userController = require("../controllers/UserController")

var passport = require('passport')
require('../strategies/google')

router.post("/", userController.Login)

router.post("/register", userController.Register)

router.get('/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/google' }), (req,res)=>{
    let token = req.user.token
    res.redirect(`http://localhost:3000/token/${token}`)

})

module.exports = router;
