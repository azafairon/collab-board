//start listen with socket.io

exports.registerServer = function init(io) {

	var self = this;
	var board = {
		elements:[]
	};

	io.on('connection', function(socket){
		self.newUser(socket);
	});

	this.newUser =function (socket) {

		// Notify to the new user the current state of the board
		socket.emit('board_state',board);

		// register the handlers for this new user
		self.registerHandlers(socket);

	};

	// List of messages we can recive

	this.registerHandlers = function(socket){

		socket.on('update_element',function(data,session){
			for (var i = 0; i<board.elements.length;i++) {
				if (board.elements[i].id == data.id) {
					board.elements[i].transform = data.transform;
					break;
				}
			}
			socket.broadcast.emit('update_element',data);
		});

		socket.on('new_element',function(data,session){
			// we update the track of the elements
			board.elements.push(data);
			socket.broadcast.emit('new_element',data);
		});

		socket.on('delete_element',function(data,session){
			socket.broadcast.emit('delete_element',data);
		});
	};

}