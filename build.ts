import path from "path";
import s from "shelljs";
const config = require(path.join(`${__dirname}/tsconfig.json`));

const outDir = config.compilerOptions.outDir;

s.rm("-rf", outDir);
s.rm("-rf", "./public/build");
