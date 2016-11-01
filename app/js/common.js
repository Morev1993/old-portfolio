$(document).ready(() => {
	/*$(document).click(()=> {
    	$('.project').addClass('js-full');
		$('.arrow').fadeOut();
  	})*/

	function setTabs() {
		$(".tab-item").not(":first").hide();
		$(".tab").click(function(e) {
			e.preventDefault();
			$(".tab").removeClass("active").eq($(this).index()).addClass("active");
			$(".tab-item").hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass("active");
	}

	var projectTmpl = Handlebars.compile($('#project').html());

	function pageIntro(id) {
		$.get( "http://localhost/personal/wp-json/wp/v2/posts?filter[name]=" + id + "", function( data ) {
			console.log(data);
			$('#project-block').html(projectTmpl(data[0]));
			$('.project').addClass('js-slide-left');
			setTabs();
		});
	}

	page('/', function() {
		page.redirect('/projects/cardpay-dashboard/')
	})
	page('/projects', function() {
		page.redirect('/projects/cardpay-dashboard/')
	})
	page('/projects/:id', function(ctx) {
		console.log(ctx);
		pageIntro(ctx.params.id);
	})
	page()

});
