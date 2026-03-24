import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['server.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['esm'],
  target: 'node24',
  shims: true,
  noExternal: ['@project/shared', '@project/database'],
  external: ['express', 'dotenv', 'cors'],
});
