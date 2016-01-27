$(function() {
var socket = io();

socket.on('update_position',function(data){
	var x = data.x;
	var y = data.y;
	var id = data.id;

	$('#'+ id).css({
		left: x + "px",
		top: y + "px"
	});

});

socket.on('update_size',function(data){

	var w = data.w;
	var h = data.h;
	var id = data.id;

	$('#'+ id).css({
		height: h + "px",
		width: w + "px"
	});

});

$( ".dragme" ).resizable({
	resize: function (event, ui) {

		var h  = $(this).height();
		var w  = $(this).width();
		var id = $(this).attr('id');

		socket.emit('size', {
				id: id,
				h: h,
				w: w 
			});
		}
	});


$( ".dragme" ).draggable({
	cursor      : "move",
	delay       : 100,
	scroll      : false,
	cancel: "",
	drag: function (event, ui) {

		var coord = $(this).position();
		var id    = $(this).attr('id');

		socket.emit('position', {
				id: id,
				x: coord.left,
				y: coord.top
			});
		}
	});
});
