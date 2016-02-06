"use strict";
var connect;
class Connect{
		constructor(){
				this.socket = io('https://tan.csie.io:3000/');
				this.socket.on("connect", () => {
						this._id = this.socket.id;
						console.log(this._id);
				});
		}
		on(event, callback){
				this.socket.on(event, callback);
		}
		set name(userName){
				this._userName = userName;
				this.socket.emit("createRoom", {name: this._userName});
		}
}
function init(){
		connect = new Connect();
		connect.name = "client"+Math.floor(Math.random()*100);// should be given by user setting
		connect.on("roomInfo", function(data){
				console.log(data);

		});
}


init();

