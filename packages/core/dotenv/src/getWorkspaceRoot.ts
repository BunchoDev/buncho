import { cosmiconfigSync } from "cosmiconfig";
import path from "path";

const explorer = cosmiconfigSync("dotenv", {
  searchPlaces: [".env"],
  loaders: { noExt: () => "" },
});

const getWorkspaceRoot = (): string => {
  const result = explorer.search();
  if (result) {
    return path.dirname(result.filepath);
  } else {
    return path.resolve(".");
  }
};

export { getWorkspaceRoot };
