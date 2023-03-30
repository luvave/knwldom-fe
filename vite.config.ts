import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
	build: { target: 'es2020' },
	optimizeDeps: {
		esbuildOptions: { target: 'es2020', supported: { bigint: true } },
	},
	plugins: [
		ViteEjsPlugin((viteConfig) => ({
			env: viteConfig.env,
		})),
		react(),
		// By default, Vite doesn't include shims for NodeJS/
		// necessary for sparql lib to work
		nodePolyfills({
			// Whether to polyfill `node:` protocol imports.
			protocolImports: true,
		}),
	],
	resolve: { alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }] },
});
