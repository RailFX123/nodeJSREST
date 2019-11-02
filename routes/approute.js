'use strict';
module.exports = function(app) {
    var todoList = require('../controller/appController');
    var catalogue = require('../controller/catalogueController');
    var users = require('../controller/userController');
    var publicaciones = require('../controller/workController');
    // todoList Routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);

    app.route('/departamentos')
        .get(catalogue.list_all_departaments);

    app.route('/departamentosMunicipios')
        .get(catalogue.list_all_departaments_by_group);

    app.route('/departamentos/:departamentId')
        .get(catalogue.read_a_departament);

    app.route('/municipios')
        .get(catalogue.list_all_munis);

    app.route('/municipios/:muniId')
        .get(catalogue.read_a_muni);

    app.route('/roles')
        .get(catalogue.list_all_roles);

    app.route('/roles/:rolId')
        .get(catalogue.read_a_rol);

    app.route('/punteos')
        .get(catalogue.list_all_scores);

    app.route('/punteos/:scoreId')
        .get(catalogue.read_a_score);

    app.route('/categoriaTrabajos')
        .get(catalogue.list_all_workc);

    app.route('/categoriaTrabajos/:workcId')
        .get(catalogue.read_a_workc);

    app.route('/login')
        .post(users.login_user);

    app.route('/usuarios')
        .get(users.list_all_users)
        .post(users.create_new_user)

    app.route('/publicaciones')
        .get(publicaciones.list_all_jobs)
        .post(publicaciones.create_a_job)

    app.route('/publicaciones/categorias/:workId')
        .get(publicaciones.read_a_Job_Category);

    app.route('/publicaciones/realizadas/usuario/:Persona_Id')
        .get(publicaciones.read_userInfo_By_Id);

    app.route('/publicaciones/encurso/usuario/:Persona_Id')
        .get(publicaciones.read_userInfo_By_Id);

    app.route('/publicaciones/estado/usuario/:Publicaciones_Id')
        .get(publicaciones.read_userInfo_By_Id);

    app.route('/publicaciones/aplicar/:Publicacion_Id/:Estado_Id')
        .put(publicaciones.update_a_Work)
};