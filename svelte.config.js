import preprocess from 'svelte-preprocess';

import adapter from '@sveltejs/adapter-static';

let base_path = '';

if (process.env.GITHUB_ACTION) {
	base_path = '/handpan-svelte/';
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages: '.build',
			assets: '.build',
			fallback: null
		}),

		paths: {
			base: base_path,
		},

		// hydrate the <div id="app"> element in src/app.html
		target: '#app'
	}
};

export default config;
