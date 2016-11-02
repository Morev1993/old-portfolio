$(document).ready(() => {
	var $projectBlock = $('#project-block');
	var $project = $('.project');
	$body = $('html, body');

	var projectTmpl = Handlebars.compile($('#project').html());
	var infoTmpl = Handlebars.compile($('#info').html());


	$body.on('click', '#show-detail', function() {
		$project.addClass('js-full');
		$('.arrow').fadeOut();
	});

	function setTabs() {
		$(".tab-item").not(":first").hide();
		$(".tab").click(function(e) {
			e.preventDefault();
			$project.addClass('js-full');
			$(".tab").removeClass("active").eq($(this).index()).addClass("active");
			$(".tab-item").hide().eq($(this).index()).fadeIn()
		}).eq(0).addClass("active");
	}

	function pageIntro(id) {
		$.get( "http://localhost/personal/wp-json/wp/v2/posts?filter[name]=" + id + "", function( data ) {
			if (data.length) {
				$projectBlock.html(projectTmpl(data[0]));
				setTimeout(function() {
					$('.bg-overlay').addClass('light');
					$project.addClass('js-slide-left');
					$project.removeClass('js-slide-right');
					$project.removeClass('js-full');
				}, 200)
				setTabs();
			} else {
				$projectBlock.html(404);
			}
		});
	}

	function info() {
		$project.removeClass('js-slide-left');
		$project.removeClass('js-full');
		$('.bg-overlay').removeClass('light');
		setTimeout(function() {
			$projectBlock.html(infoTmpl());
		}, 1200);
	}

	function notFound() {
		$projectBlock.html(404);
	}

	function redirectToIntro() {
		page.redirect('/projects/cardpay-dashboard/');
	}

	$body.on('click', '.arrow-right', function(e) {
		e.preventDefault();
		$('.bg-overlay').removeClass('light');
		$project.removeClass('js-slide-left');
		setTimeout(function() {
			page(e.target.pathname);
		}, 1000)
	});

	$body.on('click', '.arrow-left', function(e) {
		e.preventDefault();
		$('.bg-overlay').removeClass('light');
		$project.addClass('js-slide-right');
		setTimeout(function() {
			page(e.target.pathname);
		}, 1000)
	});

	page('/', redirectToIntro)
	page('/projects', redirectToIntro)
	page('/projects/:id', function(ctx) {
		pageIntro(ctx.params.id);
	});

	page('/info', info)

	page('*', notFound)
	page()

});
