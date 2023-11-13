export const fonts = () => {
  app.plugins.deleteSync([
    `${app.path.build.fonts}*`,
    `!${app.path.src.fonts}`,
  ]);

  return app.gulp
    .src(app.path.src.fonts)
    .pipe(app.gulp.dest(app.path.build.fonts));
};
