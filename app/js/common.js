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

	function hideDetail( ) {
		$project.removeClass('js-full');
		$('.project-nav').removeClass('visible');
		$('#show-detail').fadeIn();
		$('.bg-overlay').addClass('light');
		$('.preview').removeClass('js-detail');
		$(".tab.about").click();
		$('.controls').addClass('js-showed');

		updateMenuItems(location.pathname);
	}


	$body.on('click', '#show-detail', function() {
		$('.bg-overlay').removeClass('light');
		$project.addClass('js-full');
		$('.project-nav').addClass('visible');
		$('.preview').addClass('js-detail');
		$(this).hide();
		$('.controls').removeClass('js-showed');

		var nav = $('.navigation li');
        nav.removeClass('active');
	});

	$body.on('click', '#js-back', function() {
		hideDetail();
	});

	$('.navigation li a').on('click', function(e) {
		var e = e;
		e.preventDefault();

		var href = e.target.pathname;
		if (~location.pathname.indexOf('/projects') && href == '/projects') {
			hideDetail();
			return;
		};

		hideDetail();
		page(href);
	})

	function triggerSlide(e) {
		var e = e;
		e.preventDefault();
		$('.tab-content').addClass('hidy');
		$('.bg-overlay').removeClass('light');
		$('.controls').removeClass('js-showed');

		TweenLite.to(".project", 1, {className:"-=js-slide-left", onComplete: function() {
			page(e.target.pathname);
		}});
	}

	$body.on('click', '.arrow, .dots a', triggerSlide);

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

				$('.bg-overlay').addClass('light');
				setTabs();

				TweenLite.to($project, .6, {className:"+=js-slide-left", onComplete: function() {
					$('.controls').addClass('js-showed');
					next();
				}});
			} else {
				$projectBlock.html(404);
				next();
			}
		});
	}

	function info(ctx, next) {
		$('.tab-content').addClass('hidy');
		$('.bg-overlay').removeClass('light');
		$('#show-detail').hide();

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
