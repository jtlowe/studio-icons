var fs = require("fs");
var gulp = require('gulp');
var generator = require('./src/icon-generator.js');

gulp.task('build', function () {
    new generator().init();
});

gulp.task('default', ['build']);
