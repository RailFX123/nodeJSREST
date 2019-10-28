'user strict';
var sql = require('./db.js');

//Task object constructor
var Muni = function(muni) {
    this.Municipio_Id = muni.Municipio_Id;
    this.Municipio_Municipio = muni.Municipio_Municipio;
    this.Departamento_Id_FK = muni.Departamento_Id_FK;
};

Muni.getMunisById = function(departamentId, result) {
    sql.query("SELECT * FROM analisis.tb_municipio where Municipio_Id = ? ", departamentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Muni.getAllMunis = function(result) {
    sql.query("SELECT * FROM analisis.tb_municipio", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};


module.exports = Muni;