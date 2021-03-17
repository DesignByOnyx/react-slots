import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import html from "@rollup/plugin-html";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const packageJson = require("./package.json");
const isDemo = process.env.NODE_ENV === "demo";
const isProd = process.env.NODE_ENV === "production";
const isWatching = process.env.ROLLUP_WATCH;
const DEMO_DIR = "docs"; // used for github-pages
const extensions = [".js", ".jsx", ".ts", ".tsx"];

const additionalPlugins = [];
if (isDemo) {
  additionalPlugins.push(
    scss({
      output: `${DEMO_DIR}/index.css`
    }),
    html({
      fileName: "index.html",
      title: "React Slots Demo",
      template: ({ title }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="stylesheet" href="index.css">
  <script crossorigin src="https://unpkg.com/react/umd/react.development.js"></script>
</head>
<body>
  <div id="root"></div>
  <script src="index.js"></script>
</body>
</html>
`
    })
  );

  if (isWatching) {
    additionalPlugins.push(
      serve({
        host: "localhost",
        port: 3000,
        open: true,
        contentBase: [`${DEMO_DIR}`]
      }),
      livereload({
        watch: `${DEMO_DIR}`
      })
    );
  }
}

export default {
  input: isDemo ? "src/demo/index.tsx" : "src/index.tsx",
  external: ["react"],
  output: [
    {
      file: isDemo ? `${DEMO_DIR}/index.js` : packageJson.main,
      format: "umd",
      sourcemap: true,
      name: "ReactSlots",
      globals: {
        react: "React"
      }
    },
    isDemo
      ? null
      : {
          file: packageJson.module,
          format: "esm",
          sourcemap: true
        }
  ],
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      )
    }),
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    isProd && terser()
  ].concat(additionalPlugins)
};
