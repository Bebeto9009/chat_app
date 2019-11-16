let express = require('express');
let app = express();
let socket = require('socket.io');

let server = app.listen(9090, () => {
    console.log("Listening on port 9090");
});

app.use(express.static('public'));

let io = socket(server);

io.on('connection', (socket)=> {
    console.log('Socket connection made '+socket.id);
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    });

    socket.on('typing', (data)=> {
        socket.broadcast.emit('typing', data)
    })
});

