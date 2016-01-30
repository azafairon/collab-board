//start listen with socket.io

var Communication = function(io) {

// The apps start listenning

	var me = this;

	io.on('connection', function(socket){
		me.newUser(socket);
	});

	this.newUser(socket) {
		// We need to load the state of the board to communicate
		// to the new user
		console.log('New user connected');
		var board_state = {};
		socket.emit('board_state',board_state);
		//we register the socket to answer
		socket.on(message,function(data,session){
			socket.broadcast.emit(message,data);
		});

	};

}
