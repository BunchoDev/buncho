const path = require("path");
const utils = require("@buncho/utils");

const hasBabelConfig = utils.hasBabelConfig();
const hasTsconfigPaths = utils.hasTsconfigPaths();

require("@babel/register")({
  rootMode: "upward-optional",
  extensions: [".ts", ".tsx"],
  ignore: [],
  presets: hasBabelConfig ? [] : [require.resolve("@buncho/babel-preset")],
});

require("tsconfig-paths").register({
  // FIXME: https://github.com/dividab/tsconfig-paths/issues/143
  baseUrl: ".",
  // FIXME: https://github.com/dividab/tsconfig-paths/issues/101
  paths: Object.fromEntries(
    Object.entries(utils.getPaths()).map(([key, [value]]) => {
      return [key, [path.relative(path.resolve("."), value)]];
    }),
  ),
  addMatchAll: false,
});

if (hasTsconfigPaths) {
  require("tsconfig-paths/register");
}
