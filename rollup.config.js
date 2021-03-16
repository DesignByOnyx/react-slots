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
const isProd = process.env.NODE_ENV === "production";
const DEST_DIR = "dist";
const extensions = [".js", ".jsx", ".ts", ".tsx"];

const demoPlugins = isProd
  ? []
  : [
      html({
        fileName: "index.html",
        title: "Rollup + TypeScript + React = ❤️",
        template: ({ title }) => {
          return `
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
`;
        }
      }),
      serve({
        host: "localhost",
        port: 3000,
        open: true,
        contentBase: [`${DEST_DIR}`]
      }),
      livereload({
        watch: `${DEST_DIR}`
      })
    ];

export default {
  input: isProd ? "src/index.tsx" : "src/demo/index.tsx",
  external: ["react"],
  output: [
    {
      file: packageJson.main,
      format: "umd",
      sourcemap: true,
      name: "ReactSlots",
      globals: {
        react: "React"
      }
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(
        isProd ? "production" : "development"
      )
    }),
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    scss({
      output: `${DEST_DIR}/index.css`
    }),
    isProd && terser()
  ].concat(demoPlugins)
};
