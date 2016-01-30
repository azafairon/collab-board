var Board = new function (){

	var board  = this;
	var socket = io();

	var id_element = 0;

	this.paper = null;


	this.init = function (container, x, y) {

		paper = Raphael(container,x,y);

		//creating pan and zoom
		var zpd = new RaphaelZPD(paper, { zoom: true, pan: true, drag: true },board.logElement);
	};

	this.addNote = function() {

		var note = paper.rect(100,100,100,100);

		$(note.node).attr('id',id_element);
		$(note.node).addClass('note');
		note.attr({fill:"orange"});

//		note.id = id_element;


		//note.drag(dragMove, dragStart, dragEnd);

		//note.draggable = true;

		 // function dragStart(x,y,e) {
		 // 	this.current_transform = this.transform();
		 // };

		// function dragMove(dx,dy,x,y,e) {
			// this.transform(this.current_transform + 'T' + dx + ',' + dy);
			// board.sendPosition(note.id,this.transform());
		 // };

		 // function dragEnd (e) {
		 // 	this.current_transform = this.transform();
		 // };

		id_element ++;

		paper.add(note);


	};

	this.getBoardElements = function() {
		console.log(paper);
	};

	this.logElement = function(id,transform) {
		console.log (id);
		board.sendPosition(id.id,transform);
	};

	// Sockets communication

	this.sendPosition = function(id,transform) {
		socket.emit('position',{id_note:id,transform:transform});
	};

	this.sendNewNote = function() {
		socket.emit('addNote',{});
	};

	socket.on('update_position',function(data){
		//var note = paper.getById(data.id_note).transform(data.transform);
		// element.setAttribute("transform", data.transform);
		// var note = paper.getById(data.id_note).setAttribute('transform',data.transform);
		console.log(data);
		$('#' + data.id_note).attr('transform',data.transform);
	});

	socket.on('addNote',function(data){
		console.log('new note');
		board.addNote();
	});

}
