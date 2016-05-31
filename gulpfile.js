const gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  util = require('gulp-util');

  // Lint Task
  gulp.task('lint', function() {
      return gulp.src('public/js/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'));
  });

  // Compile Our Sass
  gulp.task('sass', function() {
      return gulp.src('scss/*.scss')
          .pipe(sass())
          .pipe(gulp.dest('dist/css'));
  });

  // Concatenate & Minify JS
  gulp.task('scripts', function() {
      return gulp.src('public/js/*.js')
          .pipe(concat('all.js'))
          .pipe(gulp.dest('dist'))
          .pipe(rename('all.min.js'))
          .pipe(uglify().on('error', util.log))
          .pipe(gulp.dest('dist/js'));
  });

  // Watch Files For Changes
  gulp.task('watch', function() {
      gulp.watch('js/*.js', ['lint', 'scripts']);
      gulp.watch('scss/*.scss', ['sass']);
  });

  // Default Task
  gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
