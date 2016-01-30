// notes class
function Notes(n_element,id,transform) {

	var id = id ||'note-' + n_element;
	var transform = transform || null;

	//create the raphael js object
	var note_shape = paper.rect(100,100,100,100);
	// we assigne an id to the raphael object to easly indentify and manipulate it
	$(note_shape.node).attr('id',id);
	$(note_shape.node).attr('class','note');
	// Just a bit of color
	note_shape.attr({fill:"transparent"});

	if (transform) {
		$(note_shape.node).attr('transform',transform);
	}

	return {
		id   : id,
		type : 'note',
		transform : $(note_shape.node).attr('transform')
	}

	//register handlers for this note
};
