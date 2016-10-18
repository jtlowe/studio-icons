var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

var defaultFgColor = "#111111";
var defaultBgColor = "#111111";
var lightFgColor = "#656565";
var lightBgColor = "#F3F3F3";
var darkFgColor = "#C5C5C5";
var darkBgColor = "#252526";

gulp.task('ai', function () {
  return gulp.src([
      'src/icons/*.ai',
     ])
    .pipe(gulp.dest('temp/test_ai'));
});

gulp.task('svg', function () {
    return gulp.src([
        'fileicons/images/*.svg',
        '!fileicons/images/*_inverse.svg',
    ])
    .pipe(replace(lightFgColor, darkFgColor))
    .pipe(replace(lightBgColor, darkBgColor))
    .pipe(rename(function (path) {
        path.basename += "_inverse";
    }))
    .pipe(gulp.dest('temp/test_svg'));
});

gulp.task('default', ['svg']);