'user strict';
var sql = require('./db.js');

//Task object constructor
var Departament = function(departament) {
    this.Departamento_Id = departament.Departamento_Id;
    this.Departamento_Departamento = departament.Departamento_Departamento;
};

Departament.getDepartamentsById = function(departamentId, result) {
    sql.query("SELECT * FROM analisis.tb_departamento where Departamento_Id = ? ", departamentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Departament.getAllDepartaments = function(result) {
    sql.query("SELECT * FROM analisis.tb_departamento", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

Departament.getAllDepartaments = function(result) {
    sql.query("SELECT * FROM analisis.tb_departamento", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

const groupBy = key => array =>
    array.reduce(
        (objectsByKeyValue, obj) => ({
            ...objectsByKeyValue,
            [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
        }), {}
    );
const groupByDepartament = groupBy('Departamento');

Departament.getAllDepartamentsGroup = function(result) {
    sql.query("select Departamento_Departamento Departamento,Municipio_Id,Municipio_Municipio Municipio from tb_departamento td inner join tb_municipio tm on td.Departamento_Id=tm.Departamento_Id_FK", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', groupByDepartament(res));

            result(null, groupByDepartament(res));
        }
    });
};


module.exports = Departament;