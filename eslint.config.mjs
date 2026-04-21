import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".netlify/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy prototype canvas files kept for reference while the App Router
    // screens in src/app are being promoted into the real product.
    "src/components/DesignCanvas.jsx",
    "src/components/SignupFlow.jsx",
    "src/components/SimpleFlow.jsx",
    "src/components/SocialApp.jsx",
  ]),
]);

export default eslintConfig;
