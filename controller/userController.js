'use strict';

var User = require('../model/userModel');

exports.list_all_users = function(req, res) {
    User.getAllUsers(function(err, departament) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', departament);
        res.send(departament);
    });
};

exports.login_user = function(req, res) {
    var userL = req.body;
    console.log(userL.correo);
    //handles null error 
    if (!userL.correo || !userL.contrasenia) {
        res.status(400).send({ error: true, message: 'Ingrese un usuario valido :3' });
    } else {
        User.Login(userL, function(err, task) {
            if (err) {
                res.send(err);
            } else {
                if (res) {
                    res.json(task);
                } else {
                    res.send({ error: true, message: 'Contraseña invalida :c' })
                }
            }
        });
    }
};


exports.create_new_user = function(req, res) {
    var userL = req.body;
    console.log(userL.correo);
    if (!userL.personalInformation || !userL.credentialInformation || !userL.phoneInformation) {
        res.status(400).send({ error: true, message: 'Parametros Invalidos :3' });
    } else {
        User.createUser(userL, function(err, user) {
            if (err) {
                res.send(err);
            } else {
                res.json(user);
            }
        });
    }
};