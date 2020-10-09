var app = require("express")();
const fs = require("fs");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      if(users.indexOf(data) > -1) {
         users.push(data);
         socket.emit('userSet', {username: data});
      } else {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      }
   })
});
http.listen(3000, function() {
   console.log('listening on localhost:3000');
});
