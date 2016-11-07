$(document).ready(() => {
	var $projectBlock = $('#project-block');
	var $project = $('.project');
	$body = $('html, body');

	var projectTmpl = Handlebars.compile($('#project').html());
	var infoTmpl = Handlebars.compile($('#info').html());

	function checkState(context, next){
        updateMenuItems(context.path);
		updateDotsItems(context.path);
    }

    function updateMenuItems(path) {
        var nav = $('.navigation li');
        nav.removeClass('active');
        nav.each(function(i, item) {
            var href = $(item).find('a').attr('href');
            if(~path.indexOf(href)) {
                $(item).addClass('active js-stroke');
            }
        })
    }

	function updateDotsItems(path) {
        var nav = $('.dots a');
        nav.removeClass('active');
        nav.each(function(i, item) {
            var href = $(item).attr('href');
            if(~path.indexOf(href)) {
                $(item).addClass('active');
            }
        })
    }


	$body.on('click', '#show-detail', function() {
		$('.bg-overlay').removeClass('light');
		$project.addClass('js-full');
		$('.controls').fadeOut();
		$('.project-nav').addClass('visible');
		$(this).hide();
	});

	$body.on('click', '#js-back', function() {
		$project.removeClass('js-full');
		$('.controls').fadeIn();
		$('.project-nav').removeClass('visible');
		$('#show-detail').fadeIn();
		$('.bg-overlay').addClass('light');
	});

	$body.on('click', '.arrow-right', function(e) {
		var e = e;
		e.preventDefault();
		$('.tab-content').addClass('hidy');
		$('.bg-overlay').removeClass('light');

		TweenLite.to(".project", 1, {className:"-=js-slide-left", onComplete: function() {
			page(e.target.pathname);
		}});
	});

	$body.on('click', '.arrow-left', function(e) {
		var e = e;
		e.preventDefault();
		$('.tab-content').addClass('hidy');
		$('.bg-overlay').removeClass('light');

		TweenLite.to(".project", 1, {className:"-=js-slide-left", onComplete: function() {
			page(e.target.pathname);
		}});
	});

	function setTabs() {
		$(".tab-item").not(":first").hide();
		$(".tab").click(function(e) {
			e.preventDefault();
			$(".tab").removeClass("active").eq($(this).index() - 1).addClass("active");
			$(".tab-item").hide().eq($(this).index() -1).show()
		}).eq(0).addClass("active");
	}

	function pageIntro(ctx, next) {
		$.get( "http://localhost/personal/wp-json/wp/v2/posts?filter[name]=" + ctx.params.id + "", function( data ) {
			if (data.length) {
				$projectBlock.html(projectTmpl(data[0]));

				TweenLite.to($project, 1, {className:"+=js-slide-left"});

				$('.bg-overlay').addClass('light');
				setTabs();
			} else {
				$projectBlock.html(404);
			}

			next();
		});
	}

	function info(ctx, next) {
		$('.tab-content').addClass('hidy');
		$('.bg-overlay').removeClass('light');

		$projectBlock.html(infoTmpl());

		next();
	}

	function notFound() {
		$projectBlock.html(404);
	}

	function redirectToIntro() {
		page.redirect('/projects/axios-engeeniring/');
	}

	page('/', redirectToIntro, checkState)
	page('/projects', redirectToIntro, checkState)
	page('/projects/:id', pageIntro, checkState);

	page('/info', info, checkState)

	page('*', notFound, checkState)
	page()

});
