import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./docs";
const sourceFolder = "./src";

export const path = {
  // Base folders
  rootFolder: rootFolder,
  buildFolder: buildFolder,
  sourceFolder: sourceFolder,

  // Task folders
  build: {
    html: `${buildFolder}/`,
    styles: `${buildFolder}/styles/`,
    scripts: `${buildFolder}/scripts/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    html: `${sourceFolder}/html/**/*.html`,
    styles: `${sourceFolder}/styles/main.scss`,
    scripts: `${sourceFolder}/scripts/**/*.js`,
    images: `${sourceFolder}/images/**/*.{jpg,jpeg,png,gif,webp,gif,svg,ico}`,
    fonts: `${sourceFolder}/fonts/**/*.{woff,woff2,ttf,otf,eot}`,
    files: `${sourceFolder}/files/**/*.*`,
  },
  watch: {
    html: `${sourceFolder}/html/**/*.html`,
    styles: `${sourceFolder}/styles/**/*.{css,scss,sass,less}`,
    scripts: `${sourceFolder}/scripts/**/*.js`,
    images: `${sourceFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    fonts: `${sourceFolder}/fonts/**/*.{woff,woff2,ttf,otf,eot}`,
    files: `${sourceFolder}/files/**/*.*`,
  },
};
