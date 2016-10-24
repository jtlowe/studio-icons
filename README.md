# Visual Studio Code Icon Theme
Featuring official Visual Studio icons from the well-balanced Visual Studio Image Library (https://msdn.microsoft.com/en-us/library/ms246582.aspx). Currently using icons from the VS 2015 library. These SVG icons have been color optimized to work well for dark, light, and high contrast themes. I welcome any feedback or suggestions.

**NOTE:** High Contrast icons do not currently render for the High Contrast theme. [Bug tracker](https://github.com/Microsoft/vscode/issues/14243#event-833916052)

## Icon Sample
![Preview](https://raw.githubusercontent.com/jtlowe/vscode-icon-theme/master/images/image-comparison.png)

## Preview
![Preview](https://raw.githubusercontent.com/jtlowe/vscode-icon-theme/master/images/vscode-screenshot.png)

## Build

Uses Yarn package manager and Gulp for build tasks. Current workflow:

1. Add .svg icon file to /src/svg/
2. Run ``gulp`` on the command line to run default task.

## Other

Used Philipp Kief's much appreciated [Material Icon Theme](https://github.com/PKief/vscode-extension-material-icon-theme) as a great starting point for mapping icons to extensions/filenames.
