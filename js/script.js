$(function(){
	var counter = 1;

	$('.login-botton').click(function(){
		init($('.name').val());
		$('.login').fadeToggle();
		//$('.waiting-player').fadeToggle();

		//$('.game').fadeToggle();
	});	
	$('#quit').click(function(){
		$('.login').fadeIn();
		connect.emit('disconnect');

	});
	$('#test1').click(function(){
		$('.attack-view ').fadeToggle();
	});
	$('#test2').click(function(){
		$('.def-view ').fadeToggle();
	});

	$('.battle-view').click(function (e) { 
        var posX = $(this).offset().left,
            posY = $(this).offset().top;
        posX = e.pageX - posX -15;
        posY = e.pageY - posY -15;
        var point = "<div class='click-point' style=' top:"+posY+"px; left:" +posX + "px; '>"+counter+"</div>"
        $(point).appendTo(".battle-view");
        //alert((e.pageX - posX) + ' , ' + (e.pageY - posY));
    	counter++;

    });

    $('.click-point').click(function(){
		$('this').remove();
	});

	
});

function init(my_name){
	connect = new Connect(my_name);
	connect.on("gameStart", function(data){
			console.log(data);
	});
}	