<script lang="ts">
	import { onMount } from 'svelte';
	import Handpan from '$lib/components/Handpan.svelte';
	import Track from '$lib/components/Track.svelte';
	import Player from '$lib/classes/Player';
	import TrackList from '$lib/components/TrackList.svelte';
	import { tuneStore } from '$lib/stores/tuneStore';

	onMount(() => {
		Player.loadAudioFiles();
		tuneStore.init();
	});

	function clearStorage() {
		window.localStorage.clear();
		console.log('Local storage cleared.');
		window.location.reload();
	}
</script>

<div class="container">
	<aside id="left">
		<section>
			<TrackList />
		</section>

		<section>
			<Handpan />
		</section>
	</aside>

	<aside id="center">
		<Track />
	</aside>

	<aside id="right">
		<button on:click={clearStorage}> Clear storage </button>
	</aside>
</div>

<style lang="scss">
	.container {
		width: 100%;
		padding-right: var(--bs-gutter-x, 0.75rem);
		padding-left: var(--bs-gutter-x, 0.75rem);
		margin-right: auto;
		margin-left: auto;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
	}
	@media (min-width: 576px) {
		.container {
			max-width: 540px;
		}
	}
	@media (min-width: 768px) {
		.container {
			max-width: 720px;
		}
	}
	@media (min-width: 992px) {
		.container {
			max-width: 960px;
		}
	}
	@media (min-width: 1200px) {
		.container {
			max-width: 1140px;
		}
	}
	@media (min-width: 1400px) {
		.container {
			max-width: 1320px;
		}
	}
	#left {
		flex: 2;
	}
	#center {
		flex: 3;
	}
	#right {
		flex: 1;
	}
</style>
