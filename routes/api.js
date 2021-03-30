var express = require('express');
var router = express.Router();
var apiController = require('../controllers/ApiController')
var multer = require('multer');
var path = require('path')
var passport = require('passport')
var strategy = require('../strategies/jwt')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

router.use(multer({storage:storage, fileFilter:fileFilter}).single("yourImage"))

/* RESTFUL API */

router.get('/employees', passport.authenticate('jwt'), apiController.findAll);

router.get('/employees/:id', passport.authenticate('jwt'), apiController.findOneEmployee);

router.post('/employees', passport.authenticate('jwt'), apiController.addEmployee);

router.put('/employees/:id', passport.authenticate('jwt'), apiController.update);

router.patch('/employees/:id', passport.authenticate('jwt'), apiController.update);

router.delete('/employees/:id', passport.authenticate('jwt'), apiController.deleteEmployee);



module.exports = router;
