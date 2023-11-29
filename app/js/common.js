$(document).ready(function () {
  var $projectBlock = $("#project-block");
  var $project = $(".project");
  $body = $("html, body");

  var projectTmpl = Handlebars.compile($("#project").html());
  var infoTmpl = Handlebars.compile($("#info").html());

  function checkState(context, next) {
    updateMenuItems(context.path);
    updateDotsItems(context.path);
  }

  function updateMenuItems(path) {
    var nav = $(".navigation li");
    nav.removeClass("active");
    nav.each(function (i, item) {
      var href = $(item).find("a").attr("href");
      if (~path.indexOf(href)) {
        $(item).addClass("active js-stroke");
      }
    });
  }

  function updateDotsItems(path) {
    var nav = $(".dots a");
    nav.removeClass("active");
    nav.each(function (i, item) {
      var href = $(item).attr("href");
      if (~path.indexOf(href)) {
        $(item).addClass("active");
      }
    });
  }

  function hideDetail() {
    $project.removeClass("js-full");
    $(".project-nav").removeClass("visible");
    $("#show-detail").addClass("visible");
    $(".bg-overlay").addClass("light");
    $(".preview").removeClass("js-detail");
    $(".tab.about").click();
    $(".controls").addClass("js-showed");

    updateMenuItems(location.pathname);
  }

  function showDetail() {
    $(".bg-overlay").removeClass("light");
    $project.addClass("js-full");
    $(".project-nav").addClass("visible");
    $(".preview").addClass("js-detail");
    $(this).removeClass("visible");
    $(".controls").removeClass("js-showed");

    var nav = $(".navigation li");
    nav.removeClass("active");
  }

  $body.on("click", ".shadow", showDetail);

  $body.on("click", "#js-back", hideDetail);

  $(".navigation li a").on("click", function (e) {
    var e = e;
    e.preventDefault();

    var href = e.target.pathname;
    if (~location.pathname.indexOf("/projects") && href == "/projects") {
      hideDetail();
      return;
    }

    if (~location.pathname.indexOf("/info") && href == "/projects") {
      TweenLite.to(".project", 1, { className: "-=js-slide-left" });
      page(href);
      return;
    }

    hideDetail();
    page(href);
  });

  function triggerSlide(e) {
    var e = e;
    e.preventDefault();

    var pathname = $(this).attr("href");

    $(".tab-content").addClass("hidy");
    $(".bg-overlay").removeClass("light");
    $(".controls").removeClass("js-showed");

    TweenLite.to(".project", 1, {
      className: "-=js-slide-left",
      onComplete: function () {
        page(pathname);
      },
    });
  }

  $body.on("click", ".controls a", triggerSlide);

  function setTabs() {
    $(".tab-item:first").addClass("visible");
    $(".tab")
      .click(function (e) {
        e.preventDefault();
        $(".tab")
          .removeClass("active")
          .eq($(this).index() - 1)
          .addClass("active");
        $(".tab-item")
          .removeClass("visible")
          .eq($(this).index() - 1)
          .addClass("visible");
      })
      .eq(0)
      .addClass("active");
  }

  function pageIntro(ctx, next) {
    $projectBlock.html(projectTmpl({}));

    $(".bg-overlay").addClass("light");
    setTabs();

    TweenLite.to($project, 0.6, {
      className: "+=js-slide-left",
      onComplete: function () {
        $(".controls").addClass("js-showed");
        $("#show-detail").addClass("visible");
        next();
      },
    });
  }

  function info(ctx, next) {
    $(".tab-content").addClass("hidy");
    $(".bg-overlay").removeClass("light");
    $("#show-detail").hide();

    $projectBlock.html(infoTmpl());

    next();
  }

  function notFound() {
    $projectBlock.html(404);
  }

  function redirectToIntro() {
    page.redirect("/projects/axios-engeeniring/");
  }

  page("/", redirectToIntro, checkState);
  page("/projects", redirectToIntro, checkState);
  page("/projects/:id", pageIntro, checkState);

  page("/info", info, checkState);

  page("*", notFound, checkState);
  page();
});
