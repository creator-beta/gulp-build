import { path } from "./path.js";
import { plugins } from "./plugins.js";
const isProduction = process.argv.includes("--build");

// Configurations
const gulpPlumber = (title) => {
  return {
    errorHandler: plugins.gulpNotify.onError({
      title: title,
      message: "<%= error.message %>",
      sound: false,
    }),
  };
};
const gulpImageMin = [
  plugins.mozjpeg({ quality: 75, progressive: true }),
  plugins.optipng({ optimizationLevel: 5 }),
];
const webpackStream = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: `${path.sourceFolder}/scripts/index.js`,
  },
  output: {
    filename: "app.bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
const babelConfig = {
  presets: ["@babel/preset-env"],
};

export const configs = {
  gulpPlumber: gulpPlumber,
  gulpImageMin: gulpImageMin,
  webpackStream: webpackStream,
  babelConfig: babelConfig,
};
