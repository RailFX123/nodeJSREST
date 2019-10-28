'user strict';
var sql = require('./db.js');

//Task object constructor
var Rol = function(rol) {
    this.RolUsuario_Id = rol.RolUsuario_Id;
    this.RolUsuario_rol = rol.RolUsuario_rol;
};

Rol.getRolesById = function(departamentId, result) {
    sql.query("SELECT * FROM analisis.tb_rolusuario where RolUsuario_Id = ? ", departamentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Rol.getAllRoles = function(result) {
    sql.query("SELECT * FROM analisis.tb_rolusuario", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};


module.exports = Rol;