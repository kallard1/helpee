import fs from "fs";
import path from "path";
import s from "shelljs";

const config = require(path.join(`${__dirname}/tsconfig.json`));

const outDir = config.compilerOptions.outDir;

if (process.platform !== "win32") {
  s.rm("-rf", outDir);
  s.rm("-rf", "./public/build");
} else {
  fs.rmdir(outDir, () => {});
  fs.rmdir("./public/build", () => {});
}
