// Board singleton for manage the canvas

var Board = new function (){

	var board      = this;
	var socket     = io();
	var n_element  = 0;

	this.init = function (container, x, y) {

		// Create canvas
		paper = Raphael(container,x,y);
		//creating pan and zoom , we register a callback to control
		//the elements within the canvas which has been move
		var zpd = new RaphaelZPD(paper, {
			zoom: true, 
			pan: true, 
			drag: true,
			callback: board.onMove
		});

	};

	this.addElement = function(type,id,transform) {

		var element   = {};
		var id        = id || null;
		var transform = transform || null;


		switch(type) {
			case 'note':
				element = Notes(n_element,id,transform);
				break
			case 'circle':
				element = Circle(n_element,id,transform);
				break
		}

		n_element ++;

		return element;
	};

	this.onMove = function(id,transform) {
		var element = {
			id : id,
			transform : transform
		}

		board.sendUpdateElement(element);
	};


	// Update the shape of an element in the board

	this.updateElement = function(id,transform) {
		$('#' + id).attr('transform',transform);
	}

	this.deleteElement = function(id) {
		console.log('delete element');
		$('#' + id).attr('transform',transform);
	}

	this.updateBoardFromData = function(board) {

		for (var idx = 0; idx < board.elements.length; idx++) {
			Board.addElement(
				board.elements[idx].type,
				board.elements[idx].id,
				board.elements[idx].transform);
		}

		n_element = board.elements.length;
	}

	// Sending messages TO the server
	this.sendUpdateElement = function(element) {
		socket.emit('update_element',element);
	};

	this.sendNewElement = function(element) {
		socket.emit('new_element',element);
	};

	this.sendDelete = function(id) {
		socket.emit('delete_element',{id:id});
	};

	// Listening messages FROM the server
	socket.on('update_element',function(data){

		var id        = data.id;
		var transform = data.transform;

		board.updateElement(id,transform);

	});

	socket.on('new_element',function(data){
		var id = board.addElement(data.type);
	});

	socket.on('delete_element',function(data){
		board.deleteElement(data.id);
	});

	socket.on('board_state',function(data){
		board.updateBoardFromData(data);
	});

}
