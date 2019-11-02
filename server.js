const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    socketio = require('socket.io'),
    mysql = require('mysql'),
    connectionsArray = [],
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'analisis',
        port: 3306
    }),
    POLLING_INTERVAL = 3000;
var pollingTimer;
port = process.env.PORT || 3000;

var corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/approute'); //importing route
routes(app); //register the 

const server = http.createServer(app) //creando el server con http y express como handle request
const io = socketio(server) //iniciando el server de socket.io

server.listen(9797, () => {
    console.log(`Server running in http://localhost:${9797}`)
})

var pollingLoop = function() {

    // Doing the database query
    var query = connection.query('SELECT * FROM tb_notificaciones'),
        users = []; // this array will contain the result of our db query

    // setting the query listeners
    query
        .on('error', function(err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log(err);
            updateSockets(err);
        })
        .on('result', function(user) {
            // it fills our array looping on each user row inside the db
            users.push(user);
        })
        .on('end', function() {
            // loop on itself only if there are sockets still connected
            if (connectionsArray.length) {

                pollingTimer = setTimeout(pollingLoop, POLLING_INTERVAL);

                updateSockets({
                    users: users
                });
            } else {

                console.log('The server timer was stopped because there are no more socket connections on the app')

            }
        });
};


// creating a new websocket to keep the content updated without any AJAX request
io.sockets.on('connection', function(socket) {

    console.log('Number of connections:' + connectionsArray.length);
    // starting the loop only if at least there is one user connected
    if (!connectionsArray.length) {
        pollingLoop();
    }

    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        console.log('socketID = %s got disconnected', socketIndex);
        if (~socketIndex) {
            connectionsArray.splice(socketIndex, 1);
        }
    });

    console.log('A new socket is connected!');
    connectionsArray.push(socket);

});

var updateSockets = function(data) {
    // adding the time of the last update
    data.time = new Date();
    console.log('Pushing new data to the clients connected ( connections amount = %s ) - %s', connectionsArray.length, data.time);
    // sending new data to all the sockets connected
    connectionsArray.forEach(function(tmpSocket) {
        tmpSocket.volatile.emit('notification', data);
    });
};

console.log('Please use your browser to navigate to http://localhost:9797');