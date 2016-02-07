"use strict";
var connect;
class Connect{
		constructor(userName){
				this.socket = io('https://tan.csie.io:3000/');
				this.socket.on("connect", () => {
						this._id = this.socket.id;
						this.socket.emit("createRoom", {name: this._userName});
						console.log(this._id);
						
				});
				this._userName = userName;

		}
		on(event, callback){
				this.socket.on(event, callback);
		}
		emit(...args){
			this.socket.emit(...args);
		}
		connect(){
				this.socket.connect();
		}
		disconnect(){
				this.socket.disconnect();
		}
}


