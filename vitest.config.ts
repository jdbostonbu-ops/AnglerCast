import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import GitMarkdownReporter from './vitest-md-reporter';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    reporters: ['default', new GitMarkdownReporter()],
    outputFile: { markdown: 'test-report.md' },
    exclude: ['node_modules', 'dist', '.next', 'e2e/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});