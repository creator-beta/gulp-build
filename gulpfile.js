import gulp from "gulp";
import * as dev from "./gulp/development.js";
import * as prod from "./gulp/production.js";

const devGlobalTasks = gulp.parallel(
  dev.html,
  dev.styles,
  dev.scripts,
  dev.images,
  dev.fonts,
  dev.files
);
const prodGlobalTasks = gulp.parallel(
  prod.html,
  prod.styles,
  prod.scripts,
  prod.images,
  prod.fonts,
  prod.files
);

const devMainTask = gulp.series(
  dev.clean,
  devGlobalTasks,
  gulp.parallel(dev.server, dev.watch)
);
const prodMainTask = gulp.series(
  prod.clean,
  prodGlobalTasks,
  gulp.parallel(prod.server)
);
const zipMainTask = gulp.series(prod.clean, prodGlobalTasks, prod.zip);

gulp.task("default", devMainTask);
gulp.task("production", prodMainTask);
gulp.task("zip", zipMainTask);
