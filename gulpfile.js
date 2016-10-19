var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

var colors = {
    defaultFg: "424242",
    defaultBg: "F6F6F6",
    defaultBg2: "F0EFF1",
    defaultBg3: "EFEEF0",
    lightFg: "656565",
    lightBg: "F3F3F3",
    darkFg: "C5C5C5",
    darkBg: "252526"
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
        .pipe(replace(colors.defaultFg, colors.darkFg))
        .pipe(replace(colors.defaultBg, colors.darkBg))
        .pipe(replace(colors.defaultBg2, colors.darkBg))
        .pipe(replace(colors.defaultBg3, colors.darkBg))
        .pipe(rename(function (path) {
            path.basename += "_inverse";
        }))
        .pipe(gulp.dest('fileicons/images'));
});

gulp.task('saveLight', function () {
    return gulp.src([
        'src/svg/*.svg'
    ])
        .pipe(replace(colors.defaultFg, colors.lightFg))
        .pipe(replace(colors.defaultBg, colors.lightBg))
        .pipe(replace(colors.defaultBg2, colors.lightBg))
        .pipe(replace(colors.defaultBg3, colors.lightBg))
        .pipe(gulp.dest('fileicons/images'));
});

gulp.task('default', ['saveDark', 'saveLight']);