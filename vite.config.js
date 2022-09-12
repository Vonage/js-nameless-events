import { defineConfig } from "vite";
import { resolve } from "path";
import { unlink } from "fs";
import dts from "vite-plugin-dts";

function removeFromBuild(files = []) {
  return {
    name: "remove-from-build",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const dir = outputOptions.dir;
      files.forEach((file) => {
        unlink(resolve(dir, file), () => console.log(`Deleted ${file}`));
      });
    },
  };
}

export default defineConfig({
  test: {
    include: ["tests/**/*.ts"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "js-math-utils",
      fileName: "js-math-utils",
      emptyOutDir: true,
    },
  },
  plugins: [dts(), removeFromBuild(["logo.png"])],
});
