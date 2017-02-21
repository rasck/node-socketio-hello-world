const path = require("path");
const http = require('http')

const app = require('express')();
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', handleIO );

// If 10 people connects to our website
// this will be called 10 difference time with 10 different sockets
function handleIO(socket) {
    
    function disconnect() {
        clearInterval(intv);
        console.log("client disconnected");
    }
    
    console.log("client connected");
    
    socket.on("disconnect",disconnect);
    
    var intv = setInterval(function(){
       socket.emit("hello",Math.random()); 
    },1000);
    
}

app.get('/',function(req,res){ 
     res.sendFile(path.join(__dirname+'/index.html'));
});

server.listen(8500);    