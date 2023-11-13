export const files = () => {
  app.plugins.deleteSync([
    `${app.path.build.files}*`,
    `!${app.path.src.files}`,
  ]);

  return app.gulp
    .src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files));
};
