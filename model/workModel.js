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
    sql.query("SELECT publicacion.Publicacion_Id, publicacion.Publicacion_Descripcion, publicacion.Publicacion_Direccion, publicacion.Publicacion_Presupuesto, tipotrabajo.TipoTrabajo_Tipo, municipio.Municipio_Municipio, departamento.Departamento_Departamento FROM analisis.tb_publicacion as publicacion inner join tb_municipio as municipio on municipio.Municipio_Id = publicacion.Municipio_Id_FK inner join tb_departamento as departamento on departamento.Departamento_Id = municipio.Departamento_Id_FK inner join tb_tipotrabajo as tipotrabajo on tipotrabajo.TipoTrabajo_Id=publicacion.TipoTrabajo_Id_FK", function(err, res) {

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

module.exports = Work;