var fs = require("fs");
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var inkscape = require('inkscape');
var mappings = require('./src/mappings.json');

var svgToPdfConverter = new inkscape(['--export-pdf', '--export-width=1024']);

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

gulp.task('mappings', function () {
    var savePath = "./temp/";
    var themeSettings = {
        iconDefinitions: {}
    };

    themeSettings.iconDefinitions = createDefinitionsObj();
    
    // console.log(themeSettings)

    if (!fs.existsSync(savePath)){
        fs.mkdirSync(savePath);
    }

    fs.writeFile(savePath + 'vscode-icon-theme.json', JSON.stringify(themeSettings), function (err) {
        if (err) return console.log(err);
        console.log("file saved");
    });

});

gulp.task('convert', ['saveDark', 'saveLight']);


function createDefinitionsObj() {
    var defs = {};
    var relPath = mappings.settings.iconRelPath;
    var darkPostfix = mappings.settings.darkTheme.postfix;
    var iconExtension = mappings.settings.iconFileExtension;

    for(var i = 0; i < mappings.iconDefinitions.length; i++){
        var def = mappings.iconDefinitions[i];
        var iconName = def.icon;
        var iconNameDark = def.icon.replace(iconExtension, darkPostfix + iconExtension)
        
        defs[iconName] = {
            "iconPath": relPath + iconName
        }

        defs[iconNameDark] = {
            "iconPath": relPath + iconNameDark
        }
    }

    return defs;
}