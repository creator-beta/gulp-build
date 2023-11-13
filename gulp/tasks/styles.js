export const styles = () => {
  return app.gulp
    .src(app.path.src.styles)
    .pipe(app.plugins.gulpPlumber(app.configs.gulpPlumber("STYLES")))
    .pipe(
      app.plugins.gulpIf(app.isProduction, app.plugins.gulpSourceMaps.init())
    )
    .pipe(app.plugins.gulpSassGlob())
    .pipe(app.plugins.gulpIf(app.isProduction, app.plugins.gulpGCMQ()))
    .pipe(app.plugins.sass())
    .pipe(app.plugins.gulpIf(app.isProduction, app.plugins.autoPrefixer()))
    .pipe(app.plugins.gulpIf(app.isProduction, app.plugins.csso()))
    .pipe(
      app.plugins.gulpIf(app.isProduction, app.plugins.gulpSourceMaps.write())
    )
    .pipe(app.gulp.dest(app.path.build.styles));
};
