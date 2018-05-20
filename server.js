var express = require('express');
var app = express();
var fs = require('fs');
const port = 8080;
var listener = app.listen(port);
var io = require('socket.io').listen(listener);
app.get('/',function(request,response) {
//Telling Browser That The File Provided Is A HTML File
response.writeHead(200,{"Content-Type":"text/html"});
response.write(fs.readFileSync("./public/index.html"));
  //Ending Response
  response.end();

});
var connectedUsers = [];

console.log("Server Running At:localhost:"+port);
var clients = 0;
io.on('connection',function (socket) {
    socket.on('join_room', function(data){
        socket.join(data);
        console.log(data);
        io.to(data).emit("new_message","You Joined room" + data);

    });
    socket.on('new_message', function(data){
        console.log('new msg');
        io.to(data.room).emit("new_message",data.message);

    });
    clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });
});



