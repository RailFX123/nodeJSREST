'use strict';

var Departament = require('../model/departamentModel');
var Muni = require('../model/muniModel');
var Rol = require('../model/rolModel');
var Score = require('../model/scoreModel');
var WorkC = require('../model/workCModel');

exports.list_all_departaments = function(req, res) {
    Departament.getAllDepartaments(function(err, departament) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', departament);
        res.send(departament);
    });
};
exports.read_a_departament = function(req, res) {
    Departament.getDepartamentsById(req.params.departamentId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.list_all_munis = function(req, res) {
    Muni.getAllMunis(function(err, muni) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', muni);
        res.send(muni);
    });
};
exports.read_a_muni = function(req, res) {
    Muni.getMunisById(req.params.muniId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.list_all_roles = function(req, res) {
    Rol.getAllRoles(function(err, muni) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', muni);
        res.send(muni);
    });
};
exports.read_a_rol = function(req, res) {
    Rol.getRolesById(req.params.rolId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.list_all_scores = function(req, res) {
    Score.getAllScores(function(err, muni) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', muni);
        res.send(muni);
    });
};
exports.read_a_score = function(req, res) {
    Score.getScoresById(req.params.scoreId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
exports.list_all_workc = function(req, res) {
    WorkC.getAllWorkC(function(err, muni) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', muni);
        res.send(muni);
    });
};
exports.read_a_workc = function(req, res) {
    Score.getWorkCById(req.params.workcId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};