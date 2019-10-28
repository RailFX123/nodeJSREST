'user strict';
var sql = require('./db.js');

//Task object constructor
var WorkC = function(workc) {
    this.TipoTrabajo_Id = workc.TipoTrabajo_Id;
    this.TipoTrabajo_Tipo = workc.TipoTrabajo_Tipo;
};

WorkC.getWorkCById = function(departamentId, result) {
    sql.query("SELECT * FROM analisis.tb_tipotrabajo where TipoTrabajo_Id = ? ", departamentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};

WorkC.getAllWorkC = function(result) {
    sql.query("SELECT * FROM analisis.tb_tipotrabajo", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};


module.exports = WorkC;