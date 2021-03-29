let Employee = require("../models/Employee")

exports.findAll = function (req,res) {
    Employee.findAll(function(err, employees){
        if(err)
            res.send(err)
        else{
            const recordset = employees.recordset
            res.render("Employees/list.ejs", {
                title: 'Employees List',
                employees: recordset
            })
        }

    })
}

exports.addForm = function (req, res) {
                res.render("Employees/add-employee.ejs", {
                    title: 'Add new Employee',
                })
}

exports.addEmployee = function(req, res){
    console.log("got here")
    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const Title = req.body.Title

    let EmployeeData = {
        first_name: FirstName,
        last_name: LastName,
        title: Title
    }

    Employee.create(EmployeeData,function (err) {
        // console.log('In Employees controller , findAll')
        if (err)
            res.send(err)

        else
            res.redirect('/employees')

    })
}



exports.findOneEmployee = function(req, res){
    Employee.findById(req.params.id, function(err, employee){
        if(err)
            res.send(err)
        else
            res.json(employee)
    })
}

exports.editEmployeeForm = function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if (err)
            res.send(err)
        else
        res.render("Employees/edit-employee.ejs", {
            title: 'Edit Employee',
            employee: employee.recordset[0]
        })
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
        Employee.update(req.params.id, new Employee(employee), function (err, employee) {
            if (err)
                res.send(err);
            // res.json({
            //     error: false,
            //     message: 'Employee successfully updated'
            // });
            res.redirect(`/employees/${req.params.id}/edit`)
        });
    }
};

exports.deleteEmployee = function (req, res) {
    Employee.delete(req.params.id, function (err, employee) {
        if (err)
            res.send(err);
        else
            res.redirect('/employees')
            // res.json({
        //     error: false,
        //     message: 'Employee successfully deleted'
        // });
    });
};
