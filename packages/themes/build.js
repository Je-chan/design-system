import run from "@mg/esbuild-config";
import pkg from "./package.json" assert { type: "json" };

run({
  pkg,
});
