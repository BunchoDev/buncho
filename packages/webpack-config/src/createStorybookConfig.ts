import type { Configuration } from "webpack";
import {
  CustomizeRule,
  mergeWithCustomize,
  customizeArray,
} from "webpack-merge";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { production, useFastRefresh } from "./env";
import { createRules } from "./createRules";

const config: Configuration = {
  resolve: {
    extensions: [".js", ".mjs", ".cjs", ".ts", ".tsx"],

    plugins: [new TsconfigPathsPlugin()],
  },

  module: {
    rules: createRules({
      customRules: [{ test: /\.ejs$/ }],
    }),
  },

  plugins:
    !production && useFastRefresh //
      ? [new ReactRefreshPlugin()]
      : [],
};

const mergeConfig = mergeWithCustomize({
  customizeArray: customizeArray({
    "resolve.extensions": CustomizeRule.Replace,
    "module.rules": CustomizeRule.Replace,
  }),
});

const createStorybookConfig = (defaultConfig: Configuration): Configuration => {
  return mergeConfig(defaultConfig, config);
};

export { createStorybookConfig };
