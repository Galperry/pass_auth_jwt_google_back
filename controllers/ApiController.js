let Employee = require("../models/Employee")

exports.findAll = function (req, res) {
    Employee.findAll(function (err, employees) {
        if (err)
            res.send(err)
        else {
            let recordset = employees.recordset
            recordset = recordset.map(record => {
                console.log(record)
                const {Title, FirstName, LastName, EmployeeID, PhotoPath} = record
                return {Title, FirstName, LastName, EmployeeID, PhotoPath}
            });
            res.json({error: false, message : 'success' ,recordset})
        }

    })
}


exports.addEmployee = function (req, res) {
    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const Title = req.body.Title
    const PhotoPath = req.file.path

    let EmployeeData = {
        first_name: FirstName,
        last_name: LastName,
        title: Title,
        photo_path: PhotoPath
    }

    Employee.create(EmployeeData, function (err) {
        // console.log('In Employees controller , findAll')
        if (err)
            res.send(err)

        else
            res.json({error:false, message: 'Employee Added successfully'})

    })
}

exports.findOneEmployee = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if (err)
            res.send(err)
        else{
            if (employee.recordset[0]){
                const {
                    Title,
                    LastName,
                    FirstName,
                    EmployeeID
                } = employee.recordset[0]
                res.json({
                    error: false,
                    message: 'success',
                    employee: {
                        Title,
                        LastName,
                        FirstName,
                        EmployeeID
                    }
                })

            }else{
                res.send({
                    error: true,
                    message: 'Can\'t find user'
                })
            }

        }
    })
}

exports.update = function (req, res) {
    const employee = {
        first_name: req.body.FirstName,
        last_name: req.body.LastName,
        title: req.body.Title,
    }
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        if(req.method === 'PATCH'){
            Employee.patchUpdate(req.params.id, new Employee(employee), function (err, employee) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message,
                        employee: employee
                    });

                res.json({
                    error: false,
                    message: 'Employee successfully updated'
                });

            });
        }else{
            Employee.update(req.params.id, new Employee(employee), function (err, employee) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message
                    });

                res.json({
                    error: false,
                    message: 'Employee successfully updated'
                });

            });
        }

    }
};

exports.deleteEmployee = function (req, res) {
    Employee.delete(req.params.id, function (err, employee) {
        if (err)
            res.send({
                error: true,
                message: err.message
            });
        else

        res.json({
            error: false,
            message: 'Employee successfully deleted'
        });
    });
};
