import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  assetsInclude: ['**/*.atlas', '**/*.ttf', '**/*.png', "**/*.webp", "**/*.skel"],
  plugins: [viteSingleFile()],
  build: {
    // Inline all assets (e.g., images) as base64 regardless of size.
    // Adjust the limit lower if your assets are very large and cause issues.
      minify: 'terser',
      assetsInlineLimit: 100000000, // Effectively inlines everything up to ~100MB
      cssCodeSplit: false, // Ensure all CSS is bundled together before inlining
      rollupOptions: {
      output: {
          manualChunks: undefined
      },
    },
  }
});
