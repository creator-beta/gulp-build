import gulp from "gulp";
import { configs } from "./gulp/config/configs.js";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  isProduction: process.argv.includes("--build"),
  isDevelopment: !process.argv.includes("--build"),
  gulp: gulp,
  path: path,
  plugins: plugins,
  configs: configs,
};

// Import tasks
import { clean } from "./gulp/tasks/clean.js";
import { files } from "./gulp/tasks/files.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { html } from "./gulp/tasks/html.js";
import { images } from "./gulp/tasks/images.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { server } from "./gulp/tasks/server.js";
import { styles } from "./gulp/tasks/styles.js";
import { zip } from "./gulp/tasks/zip.js";

// Base tasks
const baseTasks = gulp.parallel(html, styles, scripts, images, fonts, files);

// Development watcher
const watch = () => {
  gulp.watch(path.watch.html, gulp.parallel(html));
  gulp.watch(path.watch.styles, gulp.parallel(styles));
  gulp.watch(path.watch.scripts, gulp.parallel(scripts));
  gulp.watch(path.watch.images, gulp.parallel(images));
  gulp.watch(path.watch.fonts, gulp.parallel(fonts));
  gulp.watch(path.watch.files, gulp.parallel(files));
};

// Scenarios
const dev = gulp.series(clean, baseTasks, gulp.parallel(watch, server));
const build = gulp.series(clean, baseTasks, gulp.parallel(server));
const buildZIP = gulp.series(clean, baseTasks, zip);
export { build, buildZIP, dev };

// Scripts
gulp.task("default", dev);
