export const html = () => {
  return app.gulp
    .src([
      app.path.src.html,
      `!${app.path.sourceFolder}/html/components/**/*.html`,
    ])
    .pipe(app.plugins.gulpPlumber(app.configs.gulpPlumber("HTML")))
    .pipe(
      app.plugins.fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(
      app.plugins.gulpIf(
        app.isProduction,
        app.plugins.gulpVersionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.plugins.gulpIf(app.isProduction, app.plugins.gulpWebpHtml()))
    .pipe(app.plugins.gulpIf(app.isProduction, app.plugins.gulpHtmlclean()))
    .pipe(app.gulp.dest(app.path.build.html));
};
