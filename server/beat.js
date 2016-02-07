"use strict";

var fs = require('fs');
var https = require('https');

var socketio = require('socket.io');
var Log = require('log');

var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/tan.csie.io/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/tan.csie.io/cert.pem', 'utf8');
var fullchain = fs.readFileSync('/etc/letsencrypt/live/tan.csie.io/fullchain.pem', 'utf8');
var chain = fs.readFileSync('/etc/letsencrypt/live/tan.csie.io/chain.pem', 'utf8');
var credentials = {
		key: privateKey,
		cert: certificate,
		ca:[
				fullchain,
				chain
		]
};

var log = new Log('debug');
var app = https.createServer(credentials);
var io = socketio.listen(app);


var userNum=0;
/*
* {roomId: room}
* room = {roomId, attack: userId, 
* 	userId=[roomCreater_A,roomJoin_B], HP=[HP_A, HP_B], userName=[name_A, name_B],
* 	musicSheet
* } 
*/
var rooms = {};

var waitingQueue = [];

//const
const defaultHP=500;
const defaultATK=10;
const STATUS = {
		READY: {value:0, name:"READY"},
		PLAYING: {value:1, name:"PLAYING"}
};
io.on('connection', function(client){
		let selfId ,opId;
		let selfName ,opName, roomId;
		let selfHP, opHP;
		let intervalId;
		var startGame = function (client, roomId){
				// TODO pass op Info
				log.debug("startGame", roomId);
				io.to(roomId).emit("roomInfo", rooms[roomId]);
				// TODO include music beat = [time1,time2,time3 ...]
		};
		userNum++;

		selfId = client.id;

		client.on('disconnect', function() {//TODO
				userNum--;

				log.debug(selfName+' left');
				log.debug('useNUM:'+userNum);
		});

		client.on('createRoom', function(data){//room setting
				log.debug("createRoom", data);
				selfName = data.name;
				if(waitingQueue.length > 0){
						// join
						roomId = waitingQueue.shift();
						client.join(roomId);
						rooms[roomId].userId[1] = selfId;
						rooms[roomId].userName[1] = selfName;
						rooms[roomId].attack = (Math.random() > 0.5)?selfId:rooms[roomId].userId[0];
						startGame(client, roomId);
				}else{
						//create room
						roomId = client.id;
						client.join(roomId);
						if(rooms[roomId]){
								// TODO clear last game // emit another win, clear
						}
						waitingQueue.push(roomId);
						rooms[roomId] = {
								roomId: roomId,
								playStatus: STATUS.READY,
								userId: [selfId],
								HP: [defaultHP, defaultHP],
								userName: [selfName]

						};
				}
				log.debug('selfNam: ' + selfName);
				log.debug('roomId: ' + roomId);

		});

		client.on("start", function(data){
				//TODO
		});

});


app.listen(3000, function(){
		console.log('listening on *:3000');
});



