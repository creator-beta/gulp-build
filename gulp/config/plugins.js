import { deleteSync } from "del";
import fs from "fs";
import autoPrefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import gulpClean from "gulp-clean";
import csso from "gulp-csso";
import fileInclude from "gulp-file-include";
import gulpGroupCssMediaQueries from "gulp-group-css-media-queries";
import gulpHtmlclean from "gulp-htmlclean";
import gulpIf from "gulp-if";
import gulpImageMin, { mozjpeg, optipng } from "gulp-imagemin";
import gulpNotify from "gulp-notify";
import gulpPlumber from "gulp-plumber";
import gulpSass from "gulp-sass";
import gulpSassGlob from "gulp-sass-glob";
import gulpServerLivereload from "gulp-server-livereload";
import gulpSourceMaps from "gulp-sourcemaps";
import gulpVersionNumber from "gulp-version-number";
import gulpWebp from "gulp-webp";
import gulpWebpHtml from "gulp-webp-html";
import gulpZip from "gulp-zip";
import * as dartSass from "sass";
import webpackStream from "webpack-stream";

const sass = gulpSass(dartSass);

export const plugins = {
  // Html
  fileInclude: fileInclude,
  gulpWebpHtml: gulpWebpHtml,
  gulpHtmlclean: gulpHtmlclean,
  gulpVersionNumber: gulpVersionNumber,

  // Styles
  gulpGCMQ: gulpGroupCssMediaQueries,
  gulpSourceMaps: gulpSourceMaps,
  autoPrefixer: autoPrefixer,
  gulpSassGlob: gulpSassGlob,
  csso: csso,
  sass: sass,

  // Scripts
  babel: babel,
  webpackStream: webpackStream,

  // Images
  gulpImageMin: gulpImageMin,
  gulpWebp: gulpWebp,
  mozjpeg: mozjpeg,
  optipng: optipng,

  // Service (Gulp)
  gulpServerLivereload: gulpServerLivereload,
  gulpPlumber: gulpPlumber,
  gulpNotify: gulpNotify,
  gulpClean: gulpClean,
  gulpZip: gulpZip,
  gulpIf: gulpIf,

  // Service (Other)
  deleteSync: deleteSync,
  fs: fs,
};
