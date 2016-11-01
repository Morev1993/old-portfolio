'use-strict'

var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect');
    pug = require('gulp-pug');
    historyApiFallback = require('connect-history-api-fallback');

//server
gulp.task('server', function() {

    connect.server({
      root: 'app',
      port: 8888,
      livereload: true,
      middleware: function(connect, opt) {
          return [ historyApiFallback() ];
        }
    });

});

//html
gulp.task('html', function() {
  gulp.src('./app/*.html')
  .pipe(connect.reload());
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
        .pipe(connect.reload());
});


gulp.task('pug', function(){
    gulp.src('./app/pug/*.pug')
        .pipe(pug({
            pretty: true
        })).on("error", console.log)
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
});


//watch
gulp.task('watch', function() {
    gulp.watch('./app/less/*.less', ['less']);
    gulp.watch('./app/pug/*.pug', ['pug']);
    gulp.watch('./app/pug/inc/*.pug', ['pug']);
    gulp.watch('./app/pug/mixins/*.pug', ['pug']);
});

//default
gulp.task('default', ['server', 'html', 'less', 'watch']);
