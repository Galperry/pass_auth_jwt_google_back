let User = require("../models/User")
let bcrypt = require('bcrypt')
const saltRounds = 10


exports.Login = function(req,res){

    let username = req.body.username
    let password = req.body.password

    if (req.body.password) {
         User.find({username}, function(err,result){
            bcrypt.compare(password, result[0].password, function (err,hash) {
                if (err)
                    console.log(err)

                if (hash){
                    const user = {
                        username
                    }
                    const token = User.generateAccessToken(user)
                    
                    return res.json({
                        token
                    })
                }
                else{
                    return res.json({message:"password does not match"})
                }
            })
        })
    }

}

exports.Register = function(req,res){

    let username = req.body.username
    let password = req.body.password

    if (password) {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err)
                    console.log(err)
                    
                hashed_password = hash

                const user = {
                    username,
                    password:hashed_password
                }
                
                User.create(user, function(err,result){
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log(result)
                    }
                })

                const {password,...userdata} = user

                const token = User.generateAccessToken(userdata)
             

                return res.json({
                    token
                })

            })
    }

}