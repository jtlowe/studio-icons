var fs = require("fs");
var gulp = require('gulp');
var generator = require('./src/icon-generator.js');

gulp.task('build', function (done) {
    new generator().init();
    done();
});

gulp.task('default', gulp.series('build'));
