import { deleteSync } from "del";
import fs from "fs";
import gulp from "gulp";
import autoPrefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import gulpClean from "gulp-clean";
import csso from "gulp-csso";
import fileInclude from "gulp-file-include";
import cssMediaQueries from "gulp-group-css-media-queries";
import htmlClean from "gulp-htmlclean";
import imagemin, { mozjpeg, optipng } from "gulp-imagemin";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import gulpSass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import gulpServer from "gulp-server-livereload";
import sourceMaps from "gulp-sourcemaps";
import webp from "gulp-webp";
import webpHTML from "gulp-webp-html";
import GulpZip from "gulp-zip";
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
const imageMinConfig = [
  mozjpeg({ quality: 75, progressive: true }),
  optipng({ optimizationLevel: 5 }),
];
const sass = gulpSass(dartSass);

// Service tasks
export const clean = (done) => {
  if (fs.existsSync("./docs")) {
    return gulp.src("./docs", { read: false }).pipe(gulpClean({ force: true }));
  }
  done();
};
export const server = () => {
  return gulp.src("./docs").pipe(
    gulpServer({
      livereload: true,
      open: true,
    })
  );
};
export const zip = () => {
  deleteSync(["./**/*.zip"]);
  return gulp
    .src("./docs/**/*.*")
    .pipe(plumber(plumberConfig("ZIP")))
    .pipe(GulpZip("docs.zip"))
    .pipe(gulp.dest("./"));
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
    .pipe(webpHTML())
    .pipe(htmlClean())
    .pipe(gulp.dest("./docs/"));
};
export const styles = () => {
  return gulp
    .src("./src/styles/main.scss")
    .pipe(plumber(plumberConfig("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(cssMediaQueries())
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./docs/css/"));
};
export const scripts = () => {
  return gulp
    .src("./src/scripts/*.js")
    .pipe(plumber(plumberConfig("SCRIPTS")))
    .pipe(babel())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("./docs/scripts/"));
};

// File tasks
export const images = () => {
  return gulp
    .src("./src/images/**/*")
    .pipe(webp({ quality: 100 }))
    .pipe(gulp.dest("./docs/images/"))
    .pipe(gulp.src("./src/images/**/*"))
    .pipe(imagemin(imageMinConfig, { verbose: true }))
    .pipe(gulp.dest("./docs/images/"));
};
export const fonts = () => {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./docs/fonts/"));
};
export const files = () => {
  return gulp.src("./src/files/**/*").pipe(gulp.dest("./docs/files/"));
};
