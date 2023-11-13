export const scripts = () => {
  return app.gulp
    .src(app.path.src.scripts)
    .pipe(app.plugins.gulpPlumber(app.configs.gulpPlumber("SCRIPTS")))
    .pipe(
      app.plugins.gulpIf(app.isProduction, app.plugins.babel(app.configs.babel))
    )
    .pipe(app.plugins.webpackStream(app.configs.webpackStream))
    .pipe(app.gulp.dest(app.path.build.scripts));
};
