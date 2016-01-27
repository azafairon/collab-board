$(function() {
var socket = io();

socket.on('update_position',function(data){
	console.log('recibido ' + data);
	var x = data.x;
	var y = data.y;
	$(".dragme").css({
		left: x + "px",
		top: y + "px"
	});

});

socket.on('update_size',function(data){
	console.log('recibido ' + data);
	var w = data.w;
	var h = data.h;
	$(".dragme").css({
		height: h + "px",
		width: w + "px"
	});

});

$( ".dragme" ).resizable({
	containment : "parent",
	stop: function(e, ui) {
		var width = ui.size.width;
		var height = ui.size.height;
		var hereDrag = this;

		if($(hereDrag).find('textarea').length > 0){
			$(hereDrag).find('textarea').css('width', width - 10);
			$(hereDrag).find('textarea').css('height', height - 10);
		}
	},
	resize: function (event, ui) {
		var h = $(this).height();
		var w = $(this).width();
		socket.emit('size', {
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
		socket.emit('position', {
				x: coord.left,
				y: coord.top
			});
		}
	});
});
