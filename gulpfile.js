var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify");


var plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'

  })
};



// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {
    // Serve files from the root of this project
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(["scss/*.scss"],['scss-watch']);
    gulp.watch(["js/*.js"], ['js-watch']);
  });

gulp.task('sass', function() {
 gulp.src('./scss/style.scss')
 .pipe(plumber(plumberErrorHandler))
 .pipe(sass())
 .pipe(autoprefixer({
   browsers: ['last 2 versions']
 }))
 .pipe(gulp.dest('./build/css'))
 .pipe(cssnano())
 .pipe(rename('style.min.css'))
 .pipe(gulp.dest('./build/css'));
});

gulp.src('./src/*.ext')
.pipe(plumber())
.pipe(gulp.dest('./dist'));

gulp.task('js',function(){
	gulp.src('./js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./build/js'))
});

gulp.task('lint', function() {
  return gulp.src('js/**').pipe(eslint({
    'rules':{
      'quotes': [1, 'single'],
      'semi': [1, 'always']
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('watch', function(){

})

gulp.task('scss-watch',['sass'], function(done){
  browserSync.reload();
  done();
})

gulp.task('js-watch', ['js','lint'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('default', ['serve']); 