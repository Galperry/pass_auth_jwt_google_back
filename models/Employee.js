const dbConn = require("../config/db.config")

var Employee = function (employee) {
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.title = employee.title;
    this.photo_path = employee.photo_path
}


Employee.create = function (newEmp, result){
    dbConn.query(`INSERT INTO Employees (Title, FirstName, LastName, PhotoPath) values ('${newEmp.title}','${newEmp.first_name}','${newEmp.last_name}', '${newEmp.photo_path}')`, function (err, res) {
        if(err){
            console.log("error:", err)
            return result(err, null)
        }
        else{
            return result(null, res)
        }
    })
}

Employee.findAll = function(result) {
    dbConn.query('Select * from Employees', function(err, res){
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Employee.findById = function(id, result) {
    dbConn.query(`Select * from Employees where EmployeeID = ${id}`, function (err, res) {
        if (err) {
            console.log("error:", err)
            return result(err, null)
        } else {
            return result(null, res)
        }
    })
}

Employee.update = function (id, employee, result) {
    dbConn.query(`UPDATE employees SET FirstName = '${employee.first_name}' ,LastName='${employee.last_name}',Title='${employee.title}', PhotoPath='${employee.photo_path}' WHERE EmployeeID = ${id}`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Employee.patchUpdate = function (id, employee, result) {
    for (const key in employee) {
        if (Object.hasOwnProperty.call(employee, key)) {
            dbConn.query(`UPDATE employees SET ${key} = '${employee[key]}'  WHERE EmployeeID = ${id}`, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                } else {
                    result(null, res);
                }
            });
        }
    }
};


Employee.delete = function (id, result) {
    dbConn.query(`DELETE FROM employees WHERE EmployeeID = ${id}`, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Employee
