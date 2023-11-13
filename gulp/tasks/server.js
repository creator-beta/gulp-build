export const server = () => {
  return app.gulp.src(app.path.buildFolder).pipe(
    app.plugins.gulpServerLivereload({
      livereload: true,
      open: true,
    })
  );
};
