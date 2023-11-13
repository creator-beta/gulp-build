export const zip = () => {
  app.plugins.deleteSync(`./${app.path.rootFolder}.zip`);
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`)
    .pipe(app.plugins.gulpPlumber(app.configs.gulpPlumber("ZIP")))
    .pipe(app.plugins.gulpZip(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest("./"));
};
