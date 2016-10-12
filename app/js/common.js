$(document).ready(() => {
	$('.more').click(() => {
		$('.bg').removeClass('showed');
		$('header').removeClass('slide-right');
		$('.main-page').addClass('slide-left');
		$('.main-page .content').addClass('fade-hide');
		$('.main-page').removeClass('in');
		$('.main-page').addClass('out');
	});

	$('.bg').addClass('showed');
	$('header').addClass('slide-right');

	$('.typist')
		.typist({ speed: 15 })
		.typistPause(400)
		.typistAdd('Услуги от фронтенд-разработчика')
		.on('end_type.typist', function() {
        	$('.more').addClass('animated jello showed');
        	$('.main-page').addClass('in');
    	})

});