'use-strict'

var gulp = require('gulp'),
  less = require('gulp-less'),
  livereload = require('gulp-livereload'),
  watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    gls = require('gulp-live-server'),
    pug = require('gulp-pug');

//server
gulp.task('server', function() {

  var server = gls.static('app', 8888);
  server.start();

  gulp.watch(['./app/css/*.css', './app/*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
 
});

//html
gulp.task('html', function() {
  gulp.src('./app/*.html')
  .pipe(livereload());
});

//less
gulp.task('less', function() {
  gulp.src('./app/less/main.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(livereload());
});


gulp.task('pug', function(){
  gulp.src('./app/pug/*.pug')
    .pipe(pug({
        pretty: true
    })).on("error", console.log)
    .pipe(gulp.dest('./app'))
    .pipe(livereload());
});


//watch
gulp.task('watch', function() {
    gulp.watch('./app/less/*.less', ['less']);
    gulp.watch('./app/pug/*.pug', ['pug']);
    gulp.watch('./app/pug/inc/*.pug', ['pug']);
    gulp.watch('./app/pug/mixins/*.pug', ['pug']);
});

//default
gulp.task('default', ['server', 'html', 'less', 'pug', 'watch']);