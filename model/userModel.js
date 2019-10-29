'user strict';
var sql = require('./db.js');

//Task object constructor
var User = function(User) {
    this.Usercipio_Id = User.Usercipio_Id;
    this.Usercipio_Usercipio = User.Usercipio_Usercipio;
    this.Departamento_Id_FK = User.Departamento_Id_FK;
};

User.Login = function(user, result) {
    sql.query("SELECT persona.Persona_Id, persona.Persona_Nombre1, persona.Persona_Nombre2, persona.Persona_Apellido1, persona.Persona_Apellido2, persona.Persona_dpi, telefono.Telefono_Numero, usuario.Usuario_correo, tru.RolUsuario_Id, tru.RolUsuario_rol FROM analisis.tb_personas as persona inner join tb_telefonos as telefono on telefono.Persona_Id_FK = persona.Persona_Id inner join tb_usuarios as usuario on usuario.Persona_Id_FK= persona.Persona_Id inner join tb_rolusuario as tru on tru.RolUsuario_Id=usuario.RolUsuario_Id_FK where usuario.Usuario_correo=? and usuario.Usuario_contrasenia=?", [user.correo, user.contrasenia], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
User.getAllUsers = function(result) {
    sql.query("SELECT persona.Persona_Id, persona.Persona_Nombre1, persona.Persona_Nombre2, persona.Persona_Apellido1, persona.Persona_Apellido2, persona.Persona_dpi, telefono.Telefono_Numero, usuario.Usuario_correo, tru.RolUsuario_Id, tru.RolUsuario_rol FROM analisis.tb_personas as persona inner join tb_telefonos as telefono on telefono.Persona_Id_FK = persona.Persona_Id inner join tb_usuarios as usuario on usuario.Persona_Id_FK= persona.Persona_Id inner join tb_rolusuario as tru on tru.RolUsuario_Id=usuario.RolUsuario_Id_FK", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};

User.createUser = function(userNew, result) {
    var newUser = userNew.personalInformation;
    var newCredential = userNew.credentialInformation;
    var newPhone = userNew.phoneInformation;
    var id_usuario;
    sql.query("INSERT INTO `analisis`.`tb_personas` (`Persona_Nombre1`, `Persona_Nombre2`, `Persona_Apellido1`, `Persona_Apellido2`, `Persona_dpi`, `Persona_Nit`) VALUES (?,?,?,?,?,?)", [newUser.nombre, newUser.nombre2, newUser.apellido, newUser.apellido2, newUser.dpi, newUser.nit], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            id_usuario = res.insertId;
            //result(null, res.insertId);
            sql.query("INSERT INTO `analisis`.`tb_usuarios` (`Usuario_correo`, `Usuario_contrasenia`, `Persona_Id_FK`, `RolUsuario_Id_FK`) VALUES (?,?,?,?)", [newCredential.correo, newCredential.contrasenia, res.insertId, newCredential.rol], function(err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    sql.query("INSERT INTO `analisis`.`tb_telefonos` (`Telefono_Numero`, `Persona_Id_FK`) VALUES (?, ?)", [newPhone.numero, id_usuario], function(err, res) {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                        } else {
                            // sql.query("INSERT INTO `analisis`.`tb_trabajador` (`Persona_Id_FK`, `TipoTrabajo_Id_FK`) VALUES (?, ?)", [id_usuario, newUser.tipoTrabajo], function(err, res) {
                            //     if (err) {
                            //         console.log("error: ", err);
                            //         result(err, null);
                            //     } else {
                            result(null, { status: "200", message: "OK" });
                            //     }
                            // });
                        }
                    });
                }
            });
        }
    });
};


module.exports = User;