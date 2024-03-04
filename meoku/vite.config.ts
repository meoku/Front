import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      // @ts-expect-error: Unreachable code error
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
