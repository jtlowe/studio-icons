# Studio Icons (Visual Studio Code Icon Theme)
Featuring official icons from the [Visual Studio Image Library](https://msdn.microsoft.com/en-us/library/ms246582.aspx). These icons have been color optimized to work well for dark, light, and high contrast themes. I've tried to match Visual Studio's choice of icons as much as possible, and using other library icons for some files that would otherwise use the default file icon. I welcome any feedback or suggestions.

## Icon Sample
![Preview](https://raw.githubusercontent.com/jtlowe/vscode-icon-theme/master/images/theme-samples.png?v=3)

## Preview
![Preview](https://raw.githubusercontent.com/jtlowe/vscode-icon-theme/master/images/theme-screenshot.png?v=3)

## Build

Uses Yarn package manager and Gulp for build tasks. Current workflow:

1. Add .svg icon file to /src/svg/
2. Add the icon info to /src/icon-settings.json
3. Run ``gulp`` on the command line to run default task.

## Thanks

Thanks to the Microsoft team for their excellent icon set!

Thanks to Philipp Kief for the much appreciated [Material Icon Theme](https://github.com/PKief/vscode-extension-material-icon-theme)! Used this as a great starting point for mapping icons to extensions/filenames.