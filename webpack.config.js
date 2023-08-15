import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export default {
  entry: "./src/index.ts",
  mode: "development", // или "development" в зависимости от ваших потребностей
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // Не останавливать компиляцию из-за ошибок типов
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(new URL("./dist", import.meta.url).pathname),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(), // Плагин для асинхронной проверки типов
  ],
};
