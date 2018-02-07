document.onkeydown = function (event) {
    var key_pressed;
    if (event == null) {
        key_pressed = window.event.keyCode;
    }
    else {
        key_pressed = event.keyCode;
    }
    switch (key_pressed) {
        case 37:
            boule.direction.left = true;
            socket.emit('pos', boule);
            break;
        case 38:
            boule.direction.up = true;
            socket.emit('pos', boule);
            break;
        case 39:
            boule.direction.right = true;
            socket.emit('pos', boule);
            break;
        case 40:
            boule.direction.down = true;
            socket.emit('pos', boule);
            break;
    }
}
document.onkeyup = function (event) {
    var key_pressed;
    if (event == null) {
        key_pressed = window.event.keyCode;
    }
    else {
        key_pressed = event.keyCode;
    }
    switch (key_pressed) {
        case 37:
            boule.direction.left = false;
            socket.emit('pos', boule);
            break;
        case 38:
            boule.direction.up = false;
            socket.emit('pos', boule);
            break;
        case 39:
            boule.direction.right = false;
            socket.emit('pos', boule);
            break;
        case 40:
            boule.direction.down = false;
            socket.emit('pos', boule);
            break;
    }
}
var context;
var boule = {
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
var friction = 0.95;
context = game_area.getContext('2d');

function on_enter_frame() {
    context.clearRect(0, 0, 500, 500);
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(boule.position.x, boule.position.y, 30, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    //console.log(direction);
    socket.emit('pos', boule); 
}
socket.on('Pos', function (bouleS) {
    boule.position.x = bouleS.position.x;
    boule.position.y = bouleS.position.y;
});


setInterval(on_enter_frame, 30);
