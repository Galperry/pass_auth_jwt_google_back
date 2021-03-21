var express = require('express');
var router = express.Router();
var apiController = require('../controllers/ApiController')
var multer = require('multer');
var path = require('path')


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

router.get('/employees', apiController.findAll);

router.get('/employees/:id', apiController.findOneEmployee);

router.post('/employees', apiController.addEmployee);

router.put('/employees/:id', apiController.update);

router.patch('/employees/:id', apiController.update);

router.delete('/employees/:id', apiController.deleteEmployee);


module.exports = router;
