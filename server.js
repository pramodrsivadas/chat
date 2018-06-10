var express = require('express');
var fs = require('fs');
var socket = require('socket.io')
const port = 8080;

var app = express();
var server = app.listen(port, function(){
    console.log('listening to port' + port);
});
//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

var connectedUsers = [];
var line_history = [];

var publicRoom = 'public_room';
//console.log("Server Running At:localhost:"+port);
var clients = 0;
io.on('connection',function (socket) {

    for (var i in line_history) {
        socket.emit('draw_line', { line: line_history[i] } );
     }
     socket.on('draw_line', function (data) {
        // add received line to history 
        line_history.push(data.line);
        // send line to all clients
        io.emit('draw_line', { line: data.line });
     });
    
    socket.on('new_user', function(userData){
    	userData.id = socket.id;
    	connectedUsers.push(userData);
    	socket.join(publicRoom);
    	io.to(publicRoom).emit("update_user_list",{ userList: connectedUsers});
    });	
   
    socket.on('join_room', function(data){
        socket.join(data);
        console.log(data);
        io.to(data).emit("new_message","You Joined room" + data);

    });
    socket.on('new_pvt_message', function(data){
        console.log('new msg');
        socket.broadcast.to(data.to_user).emit("new_pvt_message",data.message);
        socket.emit("new_pvt_message",data.message);

    });
    clients++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });
});



