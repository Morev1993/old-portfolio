$(document).ready(() => {
	$(document).click(()=> {
    	$('.project').addClass('js-full');
		$('.arrow').fadeOut();
  	})

	$(".tab-item").not(":first").hide();
	$(".tab").click(function() {
		$(".tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".tab-item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");

	function pageIntro() {
		$('.project').toggleClass('js-slide-left');

		$.get( "http://localhost/personal/wp-json/wp/v2/posts/5", function( data ) {
			console.log(data);
		});
	}

	page('/', pageIntro)
	page()

});
