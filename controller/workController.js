'use strict';

var Work = require('../model/workModel');

exports.list_all_jobs = function(req, res) {
    Work.getAllJobs(function(err, task) {

        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', task);
        res.send(task);
    });
};



exports.create_a_job = function(req, res) {
    var new_job = new Work(req.body);
    console.log(new_job);
    //handles null error 
    if (!new_job.DescripcionPublicacion ||
        !new_job.PublicacionDireccion ||
        !new_job.PresupuestoTrabajo ||
        !new_job.PersonaId ||
        !new_job.TrabajoId ||
        !new_job.MunicipioId) {

        res.status(400).send({ error: true, message: 'Por favor ingresa un request valido :C' });

    } else {

        Work.createJob(new_job, function(err, task) {

            if (err)
                res.send(err);
            res.json(task);
        });
    }
};

exports.read_a_Job_Category = function(req, res) {
    Work.getJobsById(req.params.workId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.read_userInfo_By_Id = function(req, res) {
    Work.getUserInfoById(req.params.Persona_Id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
exports.read_progress_works_By_ID = function(req, res) {
    Work.getUserInfoById(req.params.Persona_Id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_Work = function(req, res) {
    Work.ActualizarEstadoTrabajo(req.params.Publicacion_Id, req.params.Estado_Id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};