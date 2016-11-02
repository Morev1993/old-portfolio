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
			if (data.length) {
				$('#project-block').html(projectTmpl(data[0]));
				setTimeout(function() {
					$('.project').addClass('js-slide-left');
					$('.project').removeClass('js-slide-right');
				}, 200)
				setTabs();
			} else {
				$('#project-block').html(404);
			}
		});
	}

	function notFound() {
		$('#project-block').html(404);
	}

	$('html, body').on('click', '.arrow-right', function(e) {
		e.preventDefault();
		$('.project').removeClass('js-slide-left');
		setTimeout(function() {
			page(e.target.pathname);
		}, 1000)
	});

	$('html, body').on('click', '.arrow-left', function(e) {
		e.preventDefault();
		$('.project').addClass('js-slide-right');
		setTimeout(function() {
			page(e.target.pathname);
		}, 1000)
	});

	page('/', function() {
		page.redirect('/projects/cardpay-dashboard/')
	})
	page('/projects', function() {
		page.redirect('/projects/cardpay-dashboard/')
	})
	page('/projects/:id', function(ctx) {
		pageIntro(ctx.params.id);
	})
	page('*', notFound)
	page()

});
