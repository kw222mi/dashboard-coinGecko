import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // 👈 Viktigt för att hantera routes korrekt
  },
  build: {
    rollupOptions: {
      external: ["react-chartjs-2"],
    },
  },
});
