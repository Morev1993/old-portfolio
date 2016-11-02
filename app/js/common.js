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
		$project.removeClass('js-slide-left');
		$.get( "http://localhost/personal/wp-json/wp/v2/posts?filter[name]=" + id + "", function( data ) {
			if (data.length) {
				console.log(data[0]);
				$projectBlock.html(projectTmpl(data[0]));
				$('.tab-item').addClass('hidy');
				setTimeout(function() {
					$('.bg-overlay').addClass('light');
					$project.addClass('js-slide-left');
					$project.removeClass('js-slide-right');
					$project.removeClass('js-full');
					$('.tab-item').removeClass('hidy');;
				}, 200)
				setTabs();
			} else {
				$projectBlock.html(404);
			}
		});
	}

	function info() {
		$project.removeClass('js-slide-left').removeClass('js-full');
		$('.tab-item').addClass('hidy');
		$('.bg-overlay').removeClass('light');
		setTimeout(function() {
			$projectBlock.html(infoTmpl());
		}, 1100);
	}

	function notFound() {
		$projectBlock.html(404);
	}

	function redirectToIntro() {
		page.redirect('/projects/axios-engeeniring/');
	}

	$body.on('click', '.arrow-right', function(e) {
		e.preventDefault();
		$('.tab-item').addClass('hidy');
		$('.bg-overlay').removeClass('light');
		$project.removeClass('js-slide-left');
		setTimeout(function() {
			page(e.target.pathname);
		}, 1100);
	});

	$body.on('click', '.arrow-left', function(e) {
		e.preventDefault();
		$('.tab-item').addClass('hidy');
		$('.bg-overlay').removeClass('light');
		$project.addClass('js-slide-right');
		setTimeout(function() {
			page(e.target.pathname);
		}, 1100);
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
