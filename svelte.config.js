import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

let base_path = '';

if (process.env.GITHUB_ACTION) {
	base_path = '/handpan-svelte';
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: '.build',
			assets: '.build',
			fallback: null
		}),

		paths: {
			base: base_path
		}
	}
};

export default config;
