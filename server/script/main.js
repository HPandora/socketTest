var express = require('express')
var app = express()
var server = app.listen(process.env.port || 3000)
var io = require('socket.io')(server)
var path = require('path')
var router = require('./routes/router')

/////////////////////////////////////////////////

app.set('socketio', io)
app.use('/game', express.static('./server/script/game/'))
app.use('/lib', express.static('./server/script/lib/'))
app.use('/', router)

var bouleS = {
    position : {
        y: 250,
        x: 250,
        x_speed: 0,
        y_speed: 0
    },
    direction : {
        left: false,
        up: false,
        right: false,
        down: false
    }
}

io.on('connection', function (socket) {
    console.log(" 1 personne c'est connecter a la page home !")
    var bouleS = {
        position : {
            y: 250,
            x: 250,
            x_speed: 0,
            y_speed: 0
        },
        direction : {
            left: false,
            up: false,
            right: false,
            down: false
        }
    }
    socket.on('pos', function (boule) {
        if (boule.direction.left) {

            bouleS.position.x_speed--;
        }
        if (boule.direction.right) {

            bouleS.position.x_speed++;
        }
        if (boule.direction.up) {

            bouleS.position.y_speed--;
        }
        if (boule.direction.down) {

            bouleS.position.y_speed++;
        }

        boule.position.x += bouleS.position.x_speed ;
        boule.position.y += bouleS.position.y_speed ;

        // boule.position.x_speed *= 0.98;
        // boule.position.y_speed *= 0.98;

        console.log(boule);
        io.emit('Pos', boule);
    });
});