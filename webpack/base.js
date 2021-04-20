const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// module.exports = {
//   entry: "./src/app.ts",
//   devtool: "source-map",
//   output: {
//     filename: "./bundle.js",
//   },
//   resolve: {
//     extensions: [".ts"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         loader: "ts-loader",
//       },
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin({
//       root: path.resolve(__dirname, "../"),
//     }),
//     new webpack.DefinePlugin({
//       CANVAS_RENDERER: JSON.stringify(true),
//       WEBGL_RENDERER: JSON.stringify(true),
//     }),
//     new HtmlWebpackPlugin({
//       template: "./index.html",
//     }),
//   ],
// };

module.exports = {
  mode: "development",
  entry: "./src/client/main.ts",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../"),
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
