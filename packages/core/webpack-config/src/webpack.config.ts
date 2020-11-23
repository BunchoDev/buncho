import path from "path";
import type { Configuration } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import HtmlPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import { production, useFastRefresh, hasTsconfigPaths } from "./env";
import { createRules } from "./createRules";

const config: Configuration = {
  mode: production ? "production" : "development",

  // FIXME: https://github.com/webpack/webpack-dev-server/issues/2758
  target: "web",

  context: path.resolve("./src"),

  entry: {
    app: ".",
  },

  output: {
    path: path.resolve("./build"),
    filename: production
      ? "static/[name].[contenthash:8].js"
      : "static/[name].js",
    assetModuleFilename: "assets/[contenthash][ext]",
    publicPath: "/",
  },

  devtool: production ? "source-map" : "cheap-module-source-map",

  resolve: {
    extensions: [".js", ".mjs", ".cjs", ".ts", ".tsx"],

    plugins: hasTsconfigPaths ? [new TsconfigPathsPlugin()] : [],
  },

  module: {
    rules: createRules({
      extract: true,
      customRules: [{ test: /\.html$/ }],
    }),
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("./public"),
          globOptions: {
            ignore: ["**/index.html"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    new HtmlPlugin({
      // FIXME: https://github.com/webpack/webpack/issues/11909
      template: /* "!!raw-loader!" + */ path.resolve("./public/index.html"),
    }),

    new MiniCssExtractPlugin({
      filename: production
        ? "static/[name].[contenthash:8].css"
        : "static/[name].css",
    }),

    new ForkTsCheckerPlugin({
      typescript: {
        configFile: path.resolve("./tsconfig.json"),
        build: true,
        mode: "write-references",
      },
      logger: {
        devServer: false,
      },
    }),

    !production && useFastRefresh && new ReactRefreshPlugin(),
  ].filter(Boolean) as Configuration["plugins"],

  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },

  devServer: {
    hot: true,

    historyApiFallback: {
      disableDotRule: true,
    },

    stats: "minimal",
  },
};

export default config;
