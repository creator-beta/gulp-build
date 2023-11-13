export const images = () => {
  app.plugins.deleteSync([
    `${app.path.build.images}*`,
    `!${app.path.src.images}`,
  ]);

  return app.gulp
    .src(app.path.src.images)
    .pipe(
      app.plugins.gulpIf(
        app.isProduction,
        app.plugins.gulpWebp({ quality: 100 })
      )
    )
    .pipe(
      app.plugins.gulpIf(app.isProduction, app.gulp.dest(app.path.build.images))
    )
    .pipe(
      app.plugins.gulpIf(app.isProduction, app.gulp.src(app.path.src.images))
    )
    .pipe(
      app.plugins.gulpIf(
        app.isProduction,
        app.plugins.gulpImageMin(app.configs.gulpImageMin, { verbose: true })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images));
};
