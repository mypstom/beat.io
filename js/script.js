$(function(){
	$('.login-botton').click(function(){
		$('.login').fadeToggle();
		//$('.game').fadeToggle();
	});	
	$('#quit').click(function(){
		$('.login').fadeIn();

	});
	$('#test1').click(function(){
		$('.attack-view ').fadeToggle();
	});
	$('#test2').click(function(){
		$('.def-view ').fadeToggle();
	});



	
});