'use strict';

var fs = require('fs');
var settings = require('./icon-settings.json');

module.exports = class IconGenerator {
    constructor() {
        this.iconDefinitions = {};
        this.paths = {
            iconSrcPath: './src/svg/',
            iconDestPath: './fileicons/images/',
            configDestPath: './fileicons/vscode-icon-theme.json',
            testExtensionsDestPath: './test/extensions/',
            testFileNamesDestPath: './test/filenames/',
            testFolderNamesDestPath: './test/foldernames/',
            testLangIdsDestPath: './test/languageIds/'
        }
        this.colors = {
            defaultFg: '424242',
            defaultBg: 'F6F6F6',
            defaultBg2: 'F0EFF1',
            defaultBg3: 'EFEEF0',
            defaultBg4: 'FFFFFF',
            lightFg: '656565',
            lightBg: 'F3F3F3',
            darkFg: 'C5C5C5',
            darkBg: '252526',
            contrastFg: 'FFFFFF',
            contrastBg: '000000',
            iconColor1: 'F16421', // vs orange
            iconColor2: '0095D7', // vs blue
            iconColor3: 'DCB67A', // vs tan - folders
            iconColor4: '388A34', // vs green1 - cs
            iconColor5: '879636', // vs green2 - py
            iconColor6: '9B4F96', // vs purple
            iconColor7: 'F05133', // vs redorange - git
            iconColor8: '00539C',  // vs blue2 -- less
            iconColor9: 'CC6699', // vs purple2 - sass
            iconColor10: 'BD1E2D', // vs red - stylesheet
            iconColor11: 'E04C06', // vs red2 - ts
            iconColor12: '68217A' // vs purple3 = vsicon
        }
    }

    init() {
        var icons = settings.iconDefinitions;
        var iconCount = icons.length;

        this.resetAll();

        for (var i = 0; i < iconCount; i++) {
            var icon = icons[i];
            this.createIcon(icon.iconPath);
            this.createTestFiles(icon);
            this.createIconDefinition(icon);
        }

        this.createConfigFile();

        return this;
    }

    resetAll() {
        this.clearFolder(this.paths.iconDestPath);
        // this.clearFolder(this.paths.testExtensionsDestPath);
        // this.clearFolder(this.paths.testFileNamesDestPath);
        // this.clearFolder(this.paths.testFolderNamesDestPath);
        // this.clearFolder(this.paths.testLangIdsDestPath);
        // this.removeFile(this.paths.configDestPath);
        return this;
    }

    createConfigFile() {
        var configs = {
            iconDefinitions: this.iconDefinitions,
            light: this.createThemeMapping('light'),
            highContrast: this.createThemeMapping('contrast')
        };

        Object.assign(configs, this.createThemeMapping('dark'));

        fs.writeFile(this.paths.configDestPath, JSON.stringify(configs, null, 4), function (err) {
            if (err) {
                return console.log(err);
            }
        });

        return this;
    }

    createIcon(iconPath) {
        var colors = this.colors;
        var srcPath = this.paths.iconSrcPath + iconPath;
        var file = fs.createReadStream(srcPath, 'utf8');
        var lightFile = '';
        var darkFile = '';
        var contrastFile = '';
        var lightFilePath = this.paths.iconDestPath + iconPath;
        var darkFilePath = lightFilePath.replace('.svg', '_inverse.svg');
        var contrastFilePath = lightFilePath.replace('.svg', '_contrast.svg');

        file.on('data', function (chunk) {
            lightFile = chunk.toString()
                .split(colors.defaultFg).join(colors.lightFg)
                .split(colors.defaultBg).join(colors.lightBg);

            darkFile = chunk.toString()
                .split(colors.defaultFg).join(colors.darkFg)
                .split(colors.defaultBg).join(colors.darkBg)
                .split(colors.defaultBg2).join(colors.darkBg)
                .split(colors.defaultBg3).join(colors.darkBg);

            contrastFile = chunk.toString()
                .split(colors.defaultFg).join(colors.contrastFg)
                .split(colors.defaultBg).join(colors.contrastBg)
                .split(colors.defaultBg2).join(colors.contrastBg)
                .split(colors.defaultBg3).join(colors.contrastBg)
                .split(colors.iconColor1).join(colors.contrastFg)
                .split(colors.iconColor2).join(colors.contrastFg)
                .split(colors.iconColor3).join(colors.contrastFg)
                .split(colors.iconColor4).join(colors.contrastFg)
                .split(colors.iconColor5).join(colors.contrastFg)
                .split(colors.iconColor6).join(colors.contrastFg)
                .split(colors.iconColor7).join(colors.contrastFg)
                .split(colors.iconColor8).join(colors.contrastFg)
                .split(colors.iconColor9).join(colors.contrastFg)
                .split(colors.iconColor10).join(colors.contrastFg)
                .split(colors.iconColor11).join(colors.contrastFg)
                .split(colors.iconColor12).join(colors.contrastFg);

        });

        file.on('end', function () {
            fs.writeFile(lightFilePath, lightFile, function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            fs.writeFile(darkFilePath, darkFile, function (err) {
                if (err) {
                    return console.log(err);
                }
            });

            fs.writeFile(contrastFilePath, contrastFile, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });

        return this;
    }

    createIconDefinition(icon) {
        var darkPathName = icon.iconPath.replace('.svg', '_inverse.svg');
        var contrastPathName = icon.iconPath.replace('.svg', '_contrast.svg');
        var path = './images/';

        this.iconDefinitions[icon.iconPath] = {
            iconPath: path + icon.iconPath
        }

        this.iconDefinitions[darkPathName] = {
            iconPath: path + darkPathName
        }

        this.iconDefinitions[contrastPathName] = {
            iconPath: path + contrastPathName
        }

        return this;
    }

    createThemeMapping(type) {
        var postfix = '';
        var theme = {
            fileExtensions: {},
            fileNames: {},
            folderNames: {},
            languageIds: {}
        };

        if (type == 'light') {
            theme.folder = settings.light.folder;
            theme.folderExpanded = settings.light.folderExpanded;
            theme.file = settings.light.file;
        }
        else if (type == 'contrast') {
            postfix = '_contrast.svg'
            theme.folder = settings.contrast.folder;
            theme.folderExpanded = settings.contrast.folderExpanded;
            theme.file = settings.contrast.file;
        }
        else if (type === 'dark') {
            postfix = '_inverse.svg'
            theme.folder = settings.folder;
            theme.folderExpanded = settings.folderExpanded;
            theme.file = settings.file;
        }

        for (var i = 0; i < settings.iconDefinitions.length; i++) {
            var icon = settings.iconDefinitions[i];
            var iconPath = icon.iconPath;

            if (icon.fileExtensions != void 0) {
                for (var j = 0; j < icon.fileExtensions.length; j++) {
                    var extension = icon.fileExtensions[j];

                    theme.fileExtensions[extension] = postfix !== ''
                        ? iconPath.replace('.svg', postfix)
                        : iconPath;
                }
            }

            if (icon.fileNames != void 0) {
                for (var j = 0; j < icon.fileNames.length; j++) {
                    var extension = icon.fileNames[j];

                    theme.fileNames[extension] = postfix !== ''
                        ? iconPath.replace('.svg', postfix)
                        : iconPath;
                }
            }
        }

        return theme;
    }

    createTestFiles(icon) {
        if (icon.fileExtensions != void 0) {
            var length = icon.fileExtensions.length;
            for (var i = 0; i < length; i++) {
                var extension = icon.fileExtensions[i];
                var filePath = this.paths.testExtensionsDestPath + extension + '.' + extension;
                this.createTestFile(filePath);
            }
        }

        if (icon.fileNames != void 0) {
            var length = icon.fileNames.length;
            for (var i = 0; i < length; i++) {
                var fileName = icon.fileNames[i];
                var filePath = this.paths.testFileNamesDestPath + fileName;
                this.createTestFile(filePath);
            }
        }

        if (icon.folderNames != void 0) {
            var length = icon.folderNames.length;
            for (var i = 0; i < length; i++) {
                var folderName = icon.folderNames[i];
                var filePath = this.paths.testfolderNamesDestPath + folderName;
                this.createTestFile(filePath);
            }
        }

        if (icon.languageIds != void 0) {
            var length = icon.languageIds.length;
            for (var i = 0; i < length; i++) {
                var languageId = icon.languageIds[i];
                var filePath = this.paths.testlanguageIdsDestPath + languageId;
                this.createTestFile(filePath);
            }
        }

        return this;
    }

    createTestFile(filePath) {
        fs.writeFile(filePath, "", function (err) {
            if (err) return console.log(err);
        });

        return this;
    }

    clearFolder(folderPath, removeSelf) {
        if (removeSelf === undefined) {
            removeSelf = false;
        }

        try {
            var files = fs.readdirSync(folderPath);
        }
        catch (e) {
            return;
        }

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var filePath = folderPath + files[i];
                this.removeFile(filePath);
            }
        }

        if (removeSelf) {
            fs.rmdirSync(folderPath);
        }

        return this;
    };

    removeFile(filePath) {
        if (this.fileExistsSync(filePath)) {

            fs.stat(filePath, function (err, fileStat) {
                if (err) {
                    if (err.code == 'ENOENT') {
                        console.log('Does not exist.');
                    }
                } else {
                    if (fileStat.isFile()) {
                        fs.unlinkSync(filePath);
                    } else if (fileStat.isDirectory()) {
                        rmDirSync(filePath);
                    }
                }
            });
        }

        return this;
    }

    fileExistsSync(filePath) {
        try {
            fs.accessSync(filePath);
            return true;
        } catch (e) {
            return false;
        }
    }
}