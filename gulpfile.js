var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

var colors = {
    defaultFg: "#424242",
    defaultBg: "#f6f6f6",
    lightFg: "#656565",
    lightBg: "#F3F3F3",
    darkFg: "#C5C5C5",
    darkBg: "#252526"
};

gulp.task('ai', function () {
    return gulp.src([
        'src/icons/*.ai',
    ])
        .pipe(gulp.dest('temp/test_ai'));
});

gulp.task('saveDark', function () {
    return gulp.src([
        'src/svg/*.svg'
    ])
        .pipe(replace(color.defaultFg, color.darkFg))
        .pipe(replace(color.defaultBg, color.darkBg))
        .pipe(rename(function (path) {
            path.basename += "_inverse";
        }))
        .pipe(gulp.dest('temp/test_svg'));
});

gulp.task('saveLight', function () {
    return gulp.src([
        'fileicons/images/*.svg',
        '!fileicons/images/*_inverse.svg',
    ])
        .pipe(replace(color.defaultFg, color.lightFg))
        .pipe(replace(color.defaultBg, color.lightFg))
        .pipe(gulp.dest('temp/test_svg'));
});

gulp.task('default', ['saveLight', 'saveDark']);