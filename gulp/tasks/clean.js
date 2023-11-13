export const clean = (done) => {
  if (app.plugins.fs.existsSync(app.path.buildFolder)) {
    return app.gulp
      .src(app.path.buildFolder, { read: false })
      .pipe(app.plugins.gulpClean({ force: true }));
  }
  done();
};
