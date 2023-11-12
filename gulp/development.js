import { deleteSync } from "del";
import fs from "fs";
import gulp from "gulp";
import changed from "gulp-changed";
import gulpClean from "gulp-clean";
import fileInclude from "gulp-file-include";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import gulpServer from "gulp-server-livereload";
import * as dartSass from "sass";
import webpack from "webpack-stream";
import webpackConfig from "../webpack.config.js";

// Configurations
const plumberConfig = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "<%= error.message %>",
      sound: false,
    }),
  };
};
const sass = gulpSass(dartSass);

// Service tasks
export const clean = (done) => {
  if (fs.existsSync("./build")) {
    return gulp
      .src("./build", { read: false })
      .pipe(gulpClean({ force: true }));
  }
  done();
};
export const watch = () => {
  gulp.watch("./src/html/**/*.html", gulp.parallel(html));
  gulp.watch("./src/styles/**/*.scss", gulp.parallel(styles));
  gulp.watch("./src/scripts/**/*.js", gulp.parallel(scripts));
  gulp.watch("./src/images/**/*", gulp.parallel(images));
  gulp.watch("./src/fonts/**/*", gulp.parallel(fonts));
  gulp.watch("./src/files/**/*", gulp.parallel(files));
};
export const server = () => {
  return gulp.src("./build").pipe(
    gulpServer({
      livereload: true,
      open: true,
    })
  );
};

// Layout tasks
export const html = () => {
  return gulp
    .src(["./src/html/**/*.html", "!./src/html/components/**/*.html"])
    .pipe(plumber(plumberConfig("HTML")))
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("./build/"));
};
export const styles = () => {
  return gulp
    .src("./src/styles/main.scss")
    .pipe(changed("./build/css/"))
    .pipe(plumber(plumberConfig("SCSS")))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(gulp.dest("./build/css/"));
};
export const scripts = () => {
  return gulp
    .src("./src/scripts/*.js")
    .pipe(changed("./build/scripts/"))
    .pipe(plumber(plumberConfig("SCRIPTS")))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("./build/scripts/"));
};

// File tasks
export const images = () => {
  deleteSync(["./build/images/**/*", "!./src/images/**/*"]);
  return gulp
    .src("./src/images/**/*")
    .pipe(changed("./build/images/"))
    .pipe(gulp.dest("./build/images/"));
};
export const fonts = () => {
  deleteSync(["./build/fonts/**/*", "!./src/fonts/**/*"]);
  return gulp
    .src("./src/fonts/**/*")
    .pipe(changed("./build/fonts/"))
    .pipe(gulp.dest("./build/fonts/"));
};
export const files = () => {
  deleteSync(["./build/files/**/*", "!./src/files/**/*"]);
  return gulp
    .src("./src/files/**/*")
    .pipe(changed("./build/files/"))
    .pipe(gulp.dest("./build/files/"));
};
