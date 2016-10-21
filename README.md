# Visual Studio Code Icon Theme
Featuring Official Visual Studio icons from the wonderful Visual Studio Image Library (https://msdn.microsoft.com/en-us/library/ms246582.aspx). Currently using icons from the VS 2015 library. These icons have been color optimized for both light and dark themes.

## Icon Sample
![Preview](https://raw.githubusercontent.com/jtlowe/vscode-icon-theme/master/images/image-comparison.png)

## Preview
![Preview](https://raw.githubusercontent.com/jtlowe/vscode-icon-theme/master/images/vscode-screenshot.png)

## Build

**NOTE:** Build script needs heavy refactoring + optimization.

Uses Yarn package manager and Gulp for build tasks. Current workflow:

1. Add .svg icon file to /src/svg/
2. Run ``gulp generateIcons``.
    * This loops over all .svg files in /src/svg/, creating a copy in /fileicons/images/ with the source .svg colors replaces by the light theme colors. (ex. /fileicons/images/Application_16x.svg)
    * Also loops through the same files, creating a copy in /fileicons/images/, replacing the source colors with the dark theme colors, then prefixes the file with "_inverse". (ex. /fileicons/images/Application_16x_inverse.svg)
3. Run `gulp generateMappings`
    * This uses the mappings file (/src/mappings.json) to generate the /fileicons/vscode-icon-theme.json file
    * It also creates and saves all of the test files under the /test/ directory

## Other

Used Philipp Kief's [Material Icon Theme](https://github.com/PKief/vscode-extension-material-icon-theme) as a great starting point for mapping icons to extensions/filenames.
