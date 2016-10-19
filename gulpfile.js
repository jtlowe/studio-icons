var fs = require("fs");
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var pdfjs = require('pdfjs-dist');

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

gulp.task('convertAi', function () {
    var pdfPath = './src/ai/Certificate_16x.ai';
    var data = new Uint8Array(fs.readFileSync(pdfPath));
    // pdfjs.disableWorker = true;
    pdfjs.workerSrc = true;

    pdfjs.getDocument(data).then(function (doc) {
        console.log('# Document Loaded');
        // console.log('Number of Pages: ' + numPages);
        // console.log();

        var lastPromise = Promise.resolve(); // will be used to chain promises
        var loadPage = function (pageNum) {
            return doc.getPage(pageNum).then(function (page) {
                var viewport = page.getViewport(1.0 /* scale */);
                console.log('page loaded');

                return page.getOperatorList().then(function (opList) {
                    console.log('got operator list')
                    var svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);

                    var test = svgGfx.getSVG(opList, viewport);

                    console.log(test)

                    // svgGfx.embedFonts = true;
                    // return svgGfx.getSVG(opList, viewport).then(function (svg) {
                    //     console.log('got svg')
                    //     //var svgDump = svg.toString();
                    //     //writeToFile(svgDump);
                    // });
                });
            });
        };

        // for (var i = 1; i <= numPages; i++) {
        lastPromise = lastPromise.then(loadPage.bind(null, 1));
        // }
        return lastPromise;
    })
});

function writeToFile(svgdump) {
    var name = getFileNameFromPath(pdfPath);
    fs.mkdir('./temp/', function (err) {
        if (!err || err.code === 'EEXIST') {
            fs.writeFile('./svgdump/' + name + '.svg', svgdump,
                function (err) {
                    if (err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log('Page: ' + pageNum);
                    }
                });
        }
    });
}




// gulp.task('default', ['saveDark', 'saveLight']);
