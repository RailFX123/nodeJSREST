'user strict';
var sql = require('./db.js');

//Task object constructor
var Score = function(score) {
    this.Punteo_Id = score.Punteo_Id;
    this.Punteo_CantEstrellas = score.Punteo_CantEstrellas;
};

Score.getScoresById = function(departamentId, result) {
    sql.query("SELECT * FROM analisis.tb_punteo where Punteo_Id = ? ", departamentId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);

        }
    });
};
Score.getAllScores = function(result) {
    sql.query("SELECT * FROM analisis.tb_punteo", function(err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};


module.exports = Score;