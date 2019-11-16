// Create connection
let socket = io.connect("http://localhost:9090");

let message = document.querySelector('#message');
let handle = document.querySelector('#handle');
let btnSend = document.querySelector('#send');
let output = document.querySelector('#chat-output');
let feedback = document.querySelector('#feedback');

btnSend.addEventListener('click', ()=> {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.innerHTML = '';
});

message.addEventListener("keypress", function () {
    socket.emit("typing", handle.value);
});

socket.on("chat",  (data) => {
    output.innerHTML += "<p><strong>" + data.handle +":</strong>" + data.message + "</p>";
    feedback.innerHTML = "";
});

socket.on('typing', (data)=> {
    feedback.innerHTML = "<p> <em>" + data + " is typing a message...</em> </p>";
});
