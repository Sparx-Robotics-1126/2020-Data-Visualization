//File Writer

const csvWriter = require('csv-write-stream');
writer = csvWriter();
var file = "test.csv";

var fs = require("fs");
writer.pipe(fs.createWriteStream(file));


//---------------------------------------
//----------Robot to Server--------------
//---------------------------------------
var net = require('net');
 
// Configuration parameters
var HOST = "10.11.26.190"; //'10.11.26.190';
var PORT = 8080;
 
// Create Server instance 
var server = net.createServer(onClientConnected);  
 
server.listen(PORT, HOST, function() {  
  console.log('server listening on %j', server.address());
});



function onClientConnected(sock) {  
  var remoteAddress = sock.remoteAddress + ':' + sock.remotePort;
  console.log('New client connected: %s', remoteAddress);
 
  sock.on('data', function(data) {
    console.log(data.toString());
    try{
    	var json = JSON.parse(data);
    	if(json.name) 
    		writer.write(JSON.parse(data));
    	broadcastToBrowsers(data.toString());
   }catch(e){
      console.log("error");
   }
  });
  sock.on('close',  function () {
    console.log('connection from %s closed', remoteAddress);
  });
};

//--------------------------------------------------------
//---------------SERVER TO BROWSER------------------------
//--------------------------------------------------------
var SERVER_PORT = 8081;
var WebSocketService = require('ws').Server
var wss = new WebSocketService({port: SERVER_PORT})
var connections = new Array;

wss.on('connection', newConnection);

function newConnection(client){
    console.log("New Browser Connection");
    connections.push(client);
    client.on('close', function() { // when a client closes its connection
            console.log("Browser Connection Closed"); // print it out
            var position = connections.indexOf(client); // get the client's position in the array
            connections.splice(position, 1); // and delete it from the array
        });
}

function broadcastToBrowsers(data){
    for(connection in connections){
        connections[connection].send(data);
    }
}

//--------------------------------------------------------
//------------------WEB SERVER------------------------
//--------------------------------------------------------
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/Data-Visualization'));

app.get('/*', function(req,res) {    
    res.sendFile(path.join(__dirname+'/dist/Data-Visualization/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
console.log("Web Server Started... http://localhost:4200");

