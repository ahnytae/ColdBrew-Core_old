const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    main: "./src/Main.ts",
    room: "./src/Room.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    port: 9000,
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "dist/index.html",
  //   }),
  // ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: "/dist",
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
