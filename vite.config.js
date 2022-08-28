import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@mui")) {
              return "vendor_mui";
            } else if (id.includes("firebase")) {
              return "vendor_firebase";
            }
            return "vendor"; // all other package goes here
          }
        },
      },
    },
  },
  plugins: [react(), splitVendorChunkPlugin()],
});
