'user strict';
var sql = require('./db.js');

//Task object constructor
var Work = function(work) {
    this.DescripcionPublicacion = work.DescripcionPublicacion;
    this.PublicacionDireccion = work.PublicacionDireccion;
    this.PresupuestoTrabajo = work.PresupuestoTrabajo;
    this.PersonaId = work.PersonaId;
    this.TrabajoId = work.TrabajoId;
    this.MunicipioId = work.MunicipioId;
};

Work.createJob = function(newWork, result) {
    sql.query("INSERT INTO `analisis`.`tb_publicacion`( `Publicacion_Descripcion`, `Publicacion_Direccion`, `Publicacion_Presupuesto`, `Persona_Id_FK`, `TipoTrabajo_Id_FK`, `Municipio_Id_FK`) VALUES (?,?,?,?,?,?)", [newWork.DescripcionPublicacion, newWork.PublicacionDireccion, newWork.PresupuestoTrabajo, newWork.PersonaId, newWork.TrabajoId, newWork.MunicipioId],
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, { status: 200, error: false, message: "Publicacion ingresada con exito. :D", insertedID: res.insertId });
            }
        });
};


Work.applyJob = function(newWork, result) {
    sql.query("INSERT INTO `analisis`.`tb_trabajo`(`Persona_Id_FK`, `Publicacion_Id_FK`, `FasesTrabajo_Id_FK`, `Punteo_Id_FK`) VALUES( ?, ?, 1, null)", [newWork.PersonaId, newWork.Publicacion_Id],
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res.insertId);
                result(null, { status: 200, error: false, message: "Publicacion ingresada con exito. :D", insertedID: res.insertId });
            }
        });
};





Work.getJobsById = function(workId, result) {
    sql.query("SELECT publicacion.Publicacion_Id, publicacion.Publicacion_Descripcion, publicacion.Publicacion_Direccion, publicacion.Publicacion_Presupuesto, tipotrabajo.TipoTrabajo_Tipo, municipio.Municipio_Municipio, departamento.Departamento_Departamento FROM analisis.tb_publicacion as publicacion inner join tb_municipio as municipio on municipio.Municipio_Id = publicacion.Municipio_Id_FK inner join tb_departamento as departamento on departamento.Departamento_Id = municipio.Departamento_Id_FK inner join tb_tipotrabajo as tipotrabajo on tipotrabajo.TipoTrabajo_Id=publicacion.TipoTrabajo_Id_FK where tipotrabajo.TipoTrabajo_Id=?", workId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Work.getUserInfoById = function(Persona_Id, result) {
    sql.query("SELECT publicacion.Publicacion_Id, publicacion.Publicacion_Descripcion, publicacion.Publicacion_Direccion, publicacion.Publicacion_Presupuesto, tipotrabajo.TipoTrabajo_Tipo, municipio.Municipio_Municipio, departamento.Departamento_Departamento FROM analisis.tb_publicacion as publicacion inner join tb_municipio as municipio on municipio.Municipio_Id = publicacion.Municipio_Id_FK inner join tb_departamento as departamento on departamento.Departamento_Id = municipio.Departamento_Id_FK inner join tb_tipotrabajo as tipotrabajo on tipotrabajo.TipoTrabajo_Id=publicacion.TipoTrabajo_Id_FK where publicacion.Persona_Id_FK=?", Persona_Id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Work.getAllJobs = function(result) {
    sql.query("SELECT publicacion.Publicacion_Id, publicacion.Publicacion_Descripcion, publicacion.Publicacion_Direccion, publicacion.Publicacion_Presupuesto, tipotrabajo.TipoTrabajo_Tipo, municipio.Municipio_Municipio, departamento.Departamento_Departamento, TT.Telefono_Numero FROM analisis.tb_publicacion AS publicacion INNER JOIN tb_municipio AS municipio ON municipio.Municipio_Id = publicacion.Municipio_Id_FK INNER JOIN tb_departamento AS departamento ON departamento.Departamento_Id = municipio.Departamento_Id_FK INNER JOIN tb_tipotrabajo AS tipotrabajo ON tipotrabajo.TipoTrabajo_Id=publicacion.TipoTrabajo_Id_FK INNER JOIN tb_personas AS TP ON TP.Persona_Id=publicacion.Persona_Id_FK INNER JOIN tb_telefonos AS TT ON TP.Persona_Id=TT.Persona_Id_FK", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};


// Task.updateById = function(id, task, result) {
//     sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else {
//             result(null, res);
//         }
//     });
// };
// Task.remove = function(id, result) {
//     sql.query("DELETE FROM tasks WHERE id = ?", [id], function(err, res) {

//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else {

//             result(null, res);
//         }
//     });
// };
Work.getPublicacionesCurso = function(Persona_Id, result) {
    sql.query("SELECT publicacion.Publicacion_Id, trabajo.Trabajo_id, publicacion.Publicacion_Descripcion, publicacion.Publicacion_Direccion, publicacion.Publicacion_Presupuesto, tipotrabajo.TipoTrabajo_Tipo, municipio.Municipio_Municipio, departamento.Departamento_Departamento, tf.FasesTrabajo_Fase estado, ifnull(Punteo_CantEstrellas, 0) punteo FROM analisis.tb_publicacion AS publicacion INNER JOIN tb_municipio AS municipio ON municipio.Municipio_Id = publicacion.Municipio_Id_FK INNER JOIN tb_departamento AS departamento ON departamento.Departamento_Id = municipio.Departamento_Id_FK INNER JOIN tb_tipotrabajo AS tipotrabajo ON tipotrabajo.TipoTrabajo_Id=publicacion.TipoTrabajo_Id_FK INNER JOIN tb_trabajo AS trabajo ON trabajo.Publicacion_Id_FK=publicacion.Publicacion_Id INNER JOIN tb_fasestrabajo tf ON tf.FasesTrabajo_Id=trabajo.FasesTrabajo_Id_FK LEFT JOIN tb_punteo tp ON tp.Punteo_Id=trabajo.Punteo_Id_FK WHERE publicacion.Persona_Id_FK=? and tf.FasesTrabajo_Id=2", Persona_Id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Work.verEstadoPublicacionesAplicadas = function(Persona_Id, result) {
    sql.query("SELECT publicacion.Publicacion_Id, trabajo.Trabajo_id, publicacion.Publicacion_Descripcion, publicacion.Publicacion_Direccion, publicacion.Publicacion_Presupuesto, tipotrabajo.TipoTrabajo_Tipo, municipio.Municipio_Municipio, departamento.Departamento_Departamento, tf.FasesTrabajo_Fase estado, ifnull(Punteo_CantEstrellas,0) punteo FROM analisis.tb_publicacion AS publicacion INNER JOIN tb_municipio AS municipio ON municipio.Municipio_Id = publicacion.Municipio_Id_FK INNER JOIN tb_departamento AS departamento ON departamento.Departamento_Id = municipio.Departamento_Id_FK INNER JOIN tb_tipotrabajo AS tipotrabajo ON tipotrabajo.TipoTrabajo_Id=publicacion.TipoTrabajo_Id_FK INNER JOIN tb_trabajo AS trabajo on trabajo.Publicacion_Id_FK=publicacion.Publicacion_Id INNER JOIN tb_fasestrabajo tf on tf.FasesTrabajo_Id=trabajo.FasesTrabajo_Id_FK left JOIN tb_punteo tp on tp.Punteo_Id=trabajo.Punteo_Id_FK where trabajo.Persona_Id_FK=?", Persona_Id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Work.ActualizarEstadoTrabajo = function(id, estado, result) {
    sql.query("UPDATE tb_trabajo set FasesTrabajo_Id_FK=? where Publicacion_Id_FK=?", [estado, id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


Work.InformacionDeUsuarioTrabajoAplicado = function(Trabajo_Id, result) {
    sql.query("SELECT persona.Persona_Nombre1, persona.Persona_Nombre2, persona.Persona_Apellido1, persona.Persona_Apellido2, tipotrabajo.TipoTrabajo_Tipo, AVG(ifnull(punteo.Punteo_CantEstrellas,0)) promedio_estrellas, persona.Persona_dpi, telefono.Telefono_Numero, usuario.Usuario_correo FROM analisis.tb_personas as persona inner join tb_telefonos as telefono on telefono.Persona_Id_FK = persona.Persona_Id inner join tb_usuarios as usuario on usuario.Persona_Id_FK= persona.Persona_Id inner join tb_trabajo as trabajo on trabajo.Persona_Id_FK = persona.Persona_Id inner join tb_publicacion as publicacion on publicacion.Publicacion_Id = trabajo.Publicacion_Id_FK inner join tb_tipotrabajo as tipotrabajo on tipotrabajo.TipoTrabajo_Id = publicacion.TipoTrabajo_Id_FK left join tb_punteo as punteo on punteo.Punteo_Id = trabajo.Punteo_Id_FK where trabajo.Trabajo_Id=? group by persona.Persona_Nombre1, persona.Persona_Nombre2, persona.Persona_Apellido1, persona.Persona_Apellido2, persona.Persona_dpi, telefono.Telefono_Numero, usuario.Usuario_correo", Trabajo_Id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};


Work.ColocarPunteo = function(id, trabajoId, result) {
    sql.query("update tb_Trabajo set Punteo_Id_FK=? where trabajo_id=?", [estado, id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Work;