let Employee = require("../models/EmployeeMongo")

exports.findAll = function (req, res) {
    Employee.find({}, function(err,result){
        if (err){
            console.log(err)
        }
        return res.json(result)
    })
}

exports.addEmployee = function (req, res) {
    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const Title = req.body.Title
    const PhotoPath = req.file.path

    const employee = {
        FirstName: FirstName,
        LastName: LastName,
        Title: Title,
        PhotoPath: PhotoPath
    }

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        Employee.create(employee, function(err,message){
            if (err){
                console.log(err)
            }
            else{
                return (res.json(message))
            }
        })
    }
}

exports.findOneEmployee = function (req, res) {
    Employee.findOne({_id:req.params.id}, function (err,result){
        if (err){
            console.log(err)
        }
        return res.json(result)
    })
}

exports.update = function (req, res) {
    const employee = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Title: req.body.Title,
        PhotoPath: req.file.path
    }

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required fields'
        });
    } else {
        Employee.findByIdAndUpdate({_id:req.params.id},employee, function(err,message){
            if (err){
                console.log(err)
            }
            else{
                return (res.json(message))
            }
        })
    }
};

exports.deleteEmployee = function (req, res) {
    Employee.findByIdAndDelete({_id:req.params.id}, function(err,message){
        if (err){
            console.log(err)
        }
        else{
            return (res.json(message))
        }
    })
};
